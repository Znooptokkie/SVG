"use strict";
// import { LanguageJSON } from "../../../interfaces/api/language.interface.js";
// import { FetchData } from "../../../services/FetchData.js";
// import { MainBorder } from "../maincontainer/MainBorder.js";
// import { InitPath } from "../../components/InitPath.js";
// import { InnerPath } from "../../components/InnerPath.js";
// // Hoekpunt voor de buitenrand van het kleine SVG container pad
// const cornerPoint = 50;
// // SVG pad voor de buitenrand van een klein taalcontainer SVG
// export const outerPath = `M60,0 L200,0 L250,50 L750,50 L800,0 L940,0 L1000,${cornerPoint} L1000,150 L950,175 L950,500 L1000,525 L1000,625 L940,675 L800,675 L775,650 L225,650 L200,675 L60,675 L0,625 L0,525 L${cornerPoint},500 L${cornerPoint},175 L0,150 L0,${cornerPoint} L60,0`;
// /**
//  * LanguageSmallContainerHTML
//  * 
//  * Creëert kleine SVG containers voor elke taal, inclusief een foreignObject met icon en label.
//  * Haalt data op uit een API endpoint.
//  */
// export class LanguageSmallContainerHTML
// {
//     private languageName: LanguageJSON[] = [];
//     // Maakt de kleine SVG containers aan op basis van API-data
//     public async createSmallSVGContainers(): Promise<SVGElement[] | null> 
//     {
//         const container = document.querySelector(".languages-small");
//         if (!container) 
//             return null;
//         const data = await this.getAPIData();
//         const svgElements: SVGElement[] = [];
//         // Voor elke taal een SVG container en bijbehorende div maken
//         for (const lang of data) 
//         {
//             const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//             svg.id = `${lang.language.toLowerCase()}-svg`;
//             svg.classList.add("small-svg");
//             container.appendChild(svg);
//             svgElements.push(svg);
//             // Binnen de SVG een foreignObject toevoegen voor HTML content
//             this.createDivContainer(lang.language, svg);
//         }
//         return svgElements;
//     }
//     // Voegt een foreignObject toe met icon en label in de SVG
//     private createDivContainer(language: string, svg: SVGElement)
//     {
//         const foreign = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
//         foreign.setAttribute("width", "100%");
//         foreign.setAttribute("height", "100%");
//         // Wrapper div voor styling van icon en label
//         const wrapper = document.createElement("div");
//         wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
//         wrapper.style.cssText = `
//             width:100%; height:100%; display:flex;
//             flex-direction:column; align-items:center;
//             justify-content:center; gap:10px;
//         `;
//         // Icon div met devicon class
//         const icon = document.createElement("div");
//         icon.className = `devicon-${language.toLowerCase()}-plain`;
//         icon.style.cssText = "font-size:60px; color:rgba(51, 81, 142, 1);";
//         // Label met taalnaam
//         const label = document.createElement("p");
//         label.style.cssText = "margin:0; font-size:28px; color:rgba(51, 81, 142, 1);";
//         label.textContent = language.toLowerCase() === "azuresqldatabase" ? "SQL" : language;
//         // Voeg icon en label toe aan wrapper en wrapper aan foreignObject
//         wrapper.append(icon, label);
//         foreign.appendChild(wrapper);
//         // Sla foreignObject op als property van de SVG element
//         (svg as any)._foreignObject = foreign;
//     }
//     // Haalt talen data op van API
//     public async getAPIData(): Promise<LanguageJSON[]>
//     {
//         const fetcher = new FetchData("api/languages");
//         const result = await fetcher.fetchJsonData();
//         this.languageName = result;
//         return result;
//     }
// }
// /**
//  * LanguageSmallBorder
//  * 
//  * Beheert het tekenen van inner paths binnen kleine taal-SVG containers.
//  * Zorgt voor schaling van de path naar nieuwe afmetingen.
//  */
// export class LanguageSmallBorder
// {
//     // Haalt de SVG elementen op
//     public async getHTMLElement(): Promise<SVGElement[] | null> 
//     {
//         const container = new LanguageSmallContainerHTML();
//         const elements = await container.createSmallSVGContainers();
//         return elements && elements.length > 0 ? elements : null;
//     }
//     // Creëert binnenrand pad voor elke kleine SVG container
//     public async createInnerPath(): Promise<void | null>
//     {
//         const svgElements = (await this.getHTMLElement())?.filter(
//             (el): el is SVGElement => el instanceof SVGElement
//         );
//         if (!svgElements) return null;
//         for (const svg of svgElements) 
//         {
//             const newW = 300;
//             const newH = 225;
//             // Schaal het pad naar nieuwe afmetingen van de kleine SVG
//             const scaledPath = this.dynamicPathScale(outerPath, 1006, 682, newW, newH);
//             // Maak een MainBorder instantie voor deze kleine SVG
//             const main = new MainBorder(
//                 svg.id,
//                 { viewBox: `0 0 ${newW} ${newH}`, preserveAspectRatio: "xMidYMid meet" },
//                 true,
//                 "language",
//                 scaledPath
//             );
//             // Bereken het inner pad voor de border
//             const innerPathStr = InnerPath.buildOffsetPath(scaledPath, 5);
//             InitPath.createBorderParts(main, scaledPath, innerPathStr, "languages-small");
//             main.init();
//             // Voeg het foreignObject met HTML content toe aan de SVG
//             const foreign = (svg as any)._foreignObject;
//             svg.appendChild(foreign);
//         }
//     }
//     /**
//      * Schaalt een SVG-path proportioneel naar een nieuwe breedte en hoogte.
//      *
//      * Wat dit doet:
//      * - Neemt een SVG path-string met absolute M- en L-commando’s
//      * - Berekent schaalfactoren op basis van oude en nieuwe afmetingen
//      * - Vermenigvuldigt elke x- en y-coördinaat met deze factoren
//      * - Geeft een nieuwe path-string terug die exact dezelfde vorm heeft,
//      *   maar geschaald is naar het nieuwe formaat
//      *
//      * Beperkingen:
//      * - Werkt alleen met absolute SVG-commando’s (M, L)
//      * - Ondersteunt geen curves (C, Q, A, etc.)
//      */
//     private dynamicPathScale(
//         path: string,
//         origW: number,
//         origH: number,
//         newW: number,
//         newH: number
//     ): string
//     {
//         // Bepaal de horizontale schaalfactor
//         // Bijvoorbeeld: 300 / 1000 = 0.3
//         const scaleX = newW / origW;
//         // Bepaal de verticale schaalfactor
//         // Bijvoorbeeld: 225 / 750 = 0.3
//         const scaleY = newH / origH;
//         /**
//          * Regex-uitleg:
//          * ([ML])        → vangt het SVG-commando M of L
//          * \s*           → optionele spaties
//          * ([\d.]+)      → x-coördinaat (getal)
//          * ,             → komma
//          * ([\d.]+)      → y-coördinaat (getal)
//          *
//          * Voorbeeld match:
//          * "L250,50"
//          * cmd = "L"
//          * x   = "250"
//          * y   = "50"
//          */
//         return path.replace(
//             /([ML])\s*([\d.]+),([\d.]+)/g,
//             (_, cmd, x, y) =>
//             {
//                 // Zet strings om naar getallen en schaal ze
//                 const scaledX = parseFloat(x) * scaleX;
//                 const scaledY = parseFloat(y) * scaleY;
//                 // Bouw het SVG-commando opnieuw op
//                 return `${cmd}${scaledX},${scaledY}`;
//             }
//         );
//     }
// }
