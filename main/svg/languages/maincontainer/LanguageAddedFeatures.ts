import { CreateSVG } from "../../components/core/SVGCreate.js";
import { SVGFactory } from "../../components/core/SVGFactory.js";

/**
 * LanguageAddedFeatures
 * 
 * Voegt extra visuele features toe aan een hoofd-SVG container:
 * - Zijbalken
 * - Tekstblokken (foreignObject)
 */
export class LanguageAddedFeatures
{
    // Creëert de zijbalken aan de linker- en rechterkant van het hoofd-SVG container
    public static createSideBars(container: CreateSVG): void 
    {
        // Maak een <g> groep aan voor de zijbalken
        const sidebarGroupFactory = new SVGFactory(container, "g",
        {
            class: "big-main-border-group",
        });

        const sidebarGroup = sidebarGroupFactory.createSvgTag();

        // Definieer de SVG pad-coördinaten voor linker- en rechterzijbalk
        const barLeftPath = "M10,515 L25,500 L25,175 L10,160 Z";
        const barRightPath = "M990,160 L975,175 L975,500 L990,515 Z";

        // Maak linkerzijbalk
        const leftBar = new SVGFactory(sidebarGroup, "path",
        {
            id: "big-sidebar-left",
            d: barLeftPath,
            fill: "#2ecc71",                     // Vul kleur groen
            stroke: "rgba(6, 10, 18, 0.7)",     // Donkere randkleur
            "stroke-opacity": "1",
            "stroke-width": 8
        });
        leftBar.createSvgTag();

        // Maak rechterzijbalk
        const rightBar = new SVGFactory(sidebarGroup, "path",
        {
            id: "big-sidebar-right",
            d: barRightPath,
            fill: "#2ecc71",
            stroke: "rgba(6, 10, 18, 0.7)",
            "stroke-opacity": "1",
            "stroke-width": 8
        });
        rightBar.createSvgTag();
    }

    // Creëert een tekstblok in het hoofd-SVG container
    public static createTextInSVG(container: CreateSVG): void 
    {
        // Maak een <g> groep aan voor de tekst
        const textGroupFactory = new SVGFactory(container, "g",
        {
            class: "main-border-text-group"
        });
        
        const textGroup = textGroupFactory.createSvgTag(); 

        // Voeg een foreignObject toe om HTML content binnen SVG te plaatsen
        const foreignObject = new SVGFactory(textGroup, "foreignObject",
            {
                x: 50,
                y: 50,
                width: 900,
                height: 580
            });

        foreignObject.createSvgTag();

        // Plaats een <div> binnen de foreignObject om tekst te stylen
        if (foreignObject.getSVGElement) {
            const div = document.createElement("div");
            div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
            div.style.width = "100%";
            div.style.height = "100%";
            div.style.padding = "2.5rem";
            div.style.display = "flex";
            div.style.lineHeight = "1.5";
            div.style.justifyContent = "center";
            div.style.alignItems = "center";
            div.style.fontStyle = "italic";
            div.style.fontSize = "54px";
            div.style.fontFamily = "Courier Prime, monospace";
            div.style.color = "rgba(51, 81, 142, 1)";
            div.innerText = '"Ik beschik over een goede basis in meerdere programmeertalen, vooral in Python en JavaScript. En ik blijf mijn kennis verder uitbreiden."';

            foreignObject.getSVGElement.appendChild(div);
        }
    }
}
