import { SVG } from "./SVG.js";
/**
 * CreateSVG
 *
 * Basisclass voor het maken van een nieuwe SVG container.
 * Beheert de HTML-element referentie, viewBox en default styling.
 */
export class CreateSVG extends SVG {
    // Initialiseert de SVG via de basis-klasse en bouwt daarna direct het root-element
    constructor(SVGHTMLID, SVGAttributes, SVGIsDefaultStyling) {
        super(SVGHTMLID, SVGAttributes, SVGIsDefaultStyling);
        // Houdt de hoofdreferentie naar het root <svg>-element vast
        this.root = null;
        this.createRootSVG();
    }
    // Zorgt dat er altijd een geldig root-SVG bestaat.
    // Controleert eerst of een SVG met deze ID al in de DOM staat.
    // Zo niet, wordt er een nieuwe SVG aangemaakt met namespace en attributen.
    createRootSVG() {
        const currentSVG = document.getElementById(this.getSVGID);
        if (currentSVG) {
            // Als het element al bestaat, wordt het opnieuw gekoppeld
            this.root = currentSVG;
        }
        else {
            // Maak een nieuwe <svg> aan indien deze nog niet bestaat
            const SVGElement = document.createElementNS(SVG.getSVG_NS(), "svg");
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
    static createSVG_NS(elementName) {
        if (!elementName) {
            console.error("No element found!");
            return null;
        }
        return document.createElementNS(SVG.getSVG_NS(), elementName);
    }
    // Utility-functie om willekeurige SVG-elementen te maken met optionele attributen.
    // Geeft null terug als de tagnaam ongeldig is.
    static createSVGElement(elementName, options) {
        const element = this.createSVG_NS(elementName);
        if (!element) {
            console.error("There is no (elementName) available!");
            return null;
        }
        if (options) {
            for (const [key, value] of Object.entries(options))
                element.setAttribute(key, String(value));
        }
        return element;
    }
    // Geeft het root-SVG element terug. 
    // Roept intern de SVG-basisfunctionaliteit aan die attribuutinstellingen toepast.
    get getSVGElementRoot() {
        return this.getSVGHTMLIDElement() ?? null;
    }
}
