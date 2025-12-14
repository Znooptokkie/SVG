export class SVG {
    // -- SVGHTMLID: The ID of the <svg> element
    // -- SVGAttributes: Optional attributes applied to the SVG element
    // -- SVGDefaultStyling: Enables responsive styling by default
    // --
    // -- **Initializes the SVG instance with ID, attributes, and default styling**
    constructor(SVGHTMLID, SVGAttributes, SVGDefaultStyling) {
        // -- SVGAttributes: Key:value pairs of attributes to apply to the SVG element
        this.SVGAttributes = {};
        // -- SVGIsDefaultStyling: Determines if default responsive styling is applied (width: 100%, height: auto)
        this.SVGIsDefaultStyling = true;
        this.SVGHTMLID = SVGHTMLID;
        this.SVGAttributes = SVGAttributes;
        this.SVGIsDefaultStyling = SVGDefaultStyling;
    }
    // -- **Returns the SVG namespace URL**
    static getSVG_NS() {
        return this.SVG_NS;
    }
    // -- SVGHTMLID: The new ID to assign to this SVG instance
    // --
    // -- **Updates the stored ID of the SVG element**
    setSVGHTMLID(SVGHTMLID) {
        this.SVGHTMLID = SVGHTMLID;
    }
    // -- **Retrieves the SVG element from the DOM using the stored ID**
    // -- **Applies all attributes stored in SVGAttributes**
    // -- **Optionally applies default responsive styling if SVGIsDefaultStyling is true**
    // --
    // -- return: The SVG element or null if not found or not an SVG element
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
        if (this.SVGAttributes) {
            for (const [key, value] of Object.entries(this.SVGAttributes)) {
                HTMLElement?.setAttribute(key, String(value));
            }
        }
        if (this.SVGIsDefaultStyling && HTMLElement)
            this.addDefaultStyling(HTMLElement);
        return HTMLElement;
    }
    // -- HTMLElement: The HTML element to style
    // --
    // -- **Applies default responsive styling to the SVG element**
    // -- **Sets width: 100%, height: auto, and display: block**
    // --
    // -- return: The styled HTML element
    addDefaultStyling(HTMLElement) {
        HTMLElement.style.width = "100%";
        HTMLElement.style.height = "auto";
        HTMLElement.style.display = "block";
        return HTMLElement;
    }
    // -- **Getter for the SVG element ID**
    get getSVGID() {
        return this.SVGHTMLID;
    }
    // -- **Getter for the SVG element attributes**
    get getSVGAttributes() {
        return this.SVGAttributes;
    }
}
// -- SVG_NS: The namespace URL required to create SVG elements in the DOM
SVG.SVG_NS = "http://www.w3.org/2000/svg";
