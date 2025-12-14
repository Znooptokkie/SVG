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
export class SVG
{
    // Namespace vereist voor het genereren en manipuleren van SVG-elementen
    private static readonly SVG_NS: string = "http://www.w3.org/2000/svg";

    // ID van het doel-SVG-element in de HTML
    private SVGHTMLID: string;

    // Attributen die op het SVG-element worden toegepast (bijv. width, height, viewBox)
    private SVGAttributes: Record<string, string | number> = {};

    // Geeft aan of standaard styling toegepast moet worden
    public SVGIsDefaultStyling: boolean = true;

    // Initialiseert een SVG-instantie met een HTML-ID, attributen en standaard styling-instellingen
    constructor(
        SVGHTMLID: string, 
        SVGAttributes: Record<string, string | number>,
        SVGDefaultStyling: boolean
    )
    {
        this.SVGHTMLID = SVGHTMLID;
        this.SVGAttributes = SVGAttributes;
        this.SVGIsDefaultStyling = SVGDefaultStyling;
    }
    
    // Geeft de SVG-namespace terug voor intern gebruik bij elementcreatie
    protected static getSVG_NS(): string
    {
        return this.SVG_NS;
    }

    // Stelt de HTML-ID opnieuw in voor dynamische aanpassingen
    protected setSVGHTMLID(SVGHTMLID: string): void
    { 
        this.SVGHTMLID = SVGHTMLID;
    }

    // Haalt het SVG-element op uit de DOM, valideert het type en past attributen en styling toe
    protected getSVGHTMLIDElement(): SVGSVGElement | null
    {
        const HTMLElement = document.getElementById(this.SVGHTMLID);
        
        if (!HTMLElement)
        {
            console.error("Not found an element with the ID: " + this.SVGHTMLID);
            return null;
        }

        if (!(HTMLElement instanceof SVGSVGElement)) {
            console.error("Found element is not an SVGSVGElement!");
            return null;
        }

        // Pas alle gedefinieerde attributen toe op het SVG-element
        if (this.SVGAttributes)
        {
            for (const [key, value] of Object.entries(this.SVGAttributes))
                HTMLElement.setAttribute(key, String(value));
        }

        // Indien standaard styling gewenst is, toepassen op het SVG-element
        if (this.SVGIsDefaultStyling && HTMLElement)
            this.addDefaultStyling(HTMLElement);
            
        return HTMLElement;
    }

    // Toepassen van basis styling: SVG vult de breedte van de container en schaalt automatisch
    private addDefaultStyling(HTMLElement: HTMLElement): HTMLElement | null
    {   
        HTMLElement.style.width = "100%";
        HTMLElement.style.height = "auto";
        HTMLElement.style.display = "block";

        return HTMLElement;
    }

    // Geeft de interne SVG-ID terug voor externe klassen
    protected get getSVGID(): string 
    {
        return this.SVGHTMLID;
    }

    // Geeft de interne attributen terug zoals ingesteld in de constructor
    protected get getSVGAttributes(): Record<string, string | number>
    {
        return this.SVGAttributes;
    }
}
