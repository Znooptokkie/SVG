import { SVG } from "./SVG.js";

import { SVGGlobalAttributes } from "../../../types/svg/attributes.global.type.js";

/**
 * CreateSVG
 * 
 * Basisclass voor het maken van een nieuwe SVG container.
 * Beheert de HTML-element referentie, viewBox en default styling.
 */
export class CreateSVG extends SVG 
{
    // Houdt de hoofdreferentie naar het root <svg>-element vast
    private root: SVGSVGElement | null = null;

    // Initialiseert de SVG via de basis-klasse en bouwt daarna direct het root-element
    constructor(
        SVGHTMLID: string,
        SVGAttributes: SVGGlobalAttributes,
        SVGIsDefaultStyling: boolean
    ) 
    {
        super(SVGHTMLID, SVGAttributes, SVGIsDefaultStyling);
        this.createRootSVG();
    }

    // Zorgt dat er altijd een geldig root-SVG bestaat.
    // Controleert eerst of een SVG met deze ID al in de DOM staat.
    // Zo niet, wordt er een nieuwe SVG aangemaakt met namespace en attributen.
    private createRootSVG(): void
    {
        const currentSVG = document.getElementById(this.getSVGID);

        if (currentSVG) 
        {
            // Als het element al bestaat, wordt het opnieuw gekoppeld
            this.root = currentSVG as unknown as SVGSVGElement;
        } 
        else 
        {
            // Maak een nieuwe <svg> aan indien deze nog niet bestaat
            const SVGElement = document.createElementNS(SVG.getSVG_NS(), "svg") as SVGSVGElement;
            SVGElement.setAttribute("id", this.getSVGID);

            // Pas alle meegegeven attributen toe op het nieuwe SVG-element
            for (const [key, value] of Object.entries(this.getSVGAttributes)) 
                SVGElement.setAttribute(key, String(value));

            // Voeg de nieuwe SVG toe aan de body
            document.body.appendChild(SVGElement);
            this.root = SVGElement;
        }
    }

    // Maakt een nieuw SVG-element aan met de juiste namespace.
    // Controleert of de tagnaam geldig is voordat het element wordt aangemaakt.
    private static createSVG_NS<K extends keyof SVGElementTagNameMap>(elementName: K): SVGElementTagNameMap[K] | null 
    {
        if (!elementName) 
        {
            console.error("No element found!");
            return null;
        }

        return document.createElementNS(SVG.getSVG_NS(), elementName) as unknown as SVGElementTagNameMap[K];
    }

    // Utility-functie om willekeurige SVG-elementen te maken met optionele attributen.
    // Geeft null terug als de tagnaam ongeldig is.
    public static createSVGElement<K extends keyof SVGElementTagNameMap>(
        elementName: K, 
        options?: Record<string, string | number>
    ): SVGElementTagNameMap[K] | null 
    {
        const element = this.createSVG_NS(elementName);

        if (!element) 
        {
            console.error("There is no (elementName) available!");
            return null;
        }

        if (options) 
        {
            for (const [key, value] of Object.entries(options)) 
                element.setAttribute(key, String(value));
        }

        return element;
    }

    // Geeft het root-SVG element terug. 
    // Roept intern de SVG-basisfunctionaliteit aan die attribuutinstellingen toepast.
    public get getSVGElementRoot(): SVGElement | null 
    {
        return this.getSVGHTMLIDElement() as SVGElement ?? null;
    }
}
