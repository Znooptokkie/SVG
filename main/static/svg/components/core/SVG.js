/**
 * SVG
 *
 * Basisclass voor het beheren van SVG-elementen in de DOM.
 * Behandelt:
 * - de SVG namespace
 * - het ophalen van SVG-elementen via een HTML-ID
 * - het instellen van attributen zoals width, height, viewBox
 * - optioneel toepassen van standaard styling op het SVG-element
 * - het teruggeven van interne SVG-ID en attributen voor gebruik in subklassen
 */
export class SVG {
    // Initialiseert een SVG-instantie met een HTML-ID, attributen en standaard styling-instellingen
    constructor(SVGHTMLID, SVGAttributes, SVGDefaultStyling) {
        // Attributen die op het SVG-element worden toegepast (bijv. width, height, viewBox)
        this.SVGAttributes = {};
        // Geeft aan of standaard styling toegepast moet worden
        this.SVGIsDefaultStyling = true;
        this.SVGHTMLID = SVGHTMLID;
        this.SVGAttributes = SVGAttributes;
        this.SVGIsDefaultStyling = SVGDefaultStyling;
    }
    // Geeft de SVG-namespace terug voor intern gebruik bij elementcreatie
    static getSVG_NS() {
        return this.SVG_NS;
    }
    // Stelt de HTML-ID opnieuw in voor dynamische aanpassingen
    setSVGHTMLID(SVGHTMLID) {
        this.SVGHTMLID = SVGHTMLID;
    }
    // Haalt het SVG-element op uit de DOM, valideert het type en past attributen en styling toe
    getSVGHTMLIDElement() {
        const HTMLElement = document.getElementById(this.SVGHTMLID);
        if (!HTMLElement) {
            console.error("Not found an element with the ID: " + this.SVGHTMLID);
            return null;
        }
        if (!(HTMLElement instanceof SVGSVGElement)) {
            console.error("Found element is not an SVGSVGElement!");
            return null;
        }
        // Pas alle gedefinieerde attributen toe op het SVG-element
        if (this.SVGAttributes) {
            for (const [key, value] of Object.entries(this.SVGAttributes))
                HTMLElement.setAttribute(key, String(value));
        }
        // Indien standaard styling gewenst is, toepassen op het SVG-element
        if (this.SVGIsDefaultStyling && HTMLElement)
            this.addDefaultStyling(HTMLElement);
        return HTMLElement;
    }
    // Toepassen van basis styling: SVG vult de breedte van de container en schaalt automatisch
    addDefaultStyling(HTMLElement) {
        HTMLElement.style.width = "100%";
        HTMLElement.style.height = "auto";
        HTMLElement.style.display = "block";
        return HTMLElement;
    }
    // Geeft de interne SVG-ID terug voor externe klassen
    get getSVGID() {
        return this.SVGHTMLID;
    }
    // Geeft de interne attributen terug zoals ingesteld in de constructor
    get getSVGAttributes() {
        return this.SVGAttributes;
    }
}
// Namespace vereist voor het genereren en manipuleren van SVG-elementen
SVG.SVG_NS = "http://www.w3.org/2000/svg";
