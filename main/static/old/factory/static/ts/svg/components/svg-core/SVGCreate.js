import { SVG } from "./SVG_NS.js";
// -- SVGHTMLID: The ID of the main <svg> HTML element
// -- SVGAttributes: A key:value object containing options to apply to the SVG element
// -- SVGIsDefaultStyling: Determines whether default responsive styling is applied (default = true)
// --
// -- **This class inherits from the SVG class**
export class CreateSVG extends SVG {
    // -- SVGHTMLID: The ID of the SVG container
    // -- SVGAttributes: Key:value pairs for optional attributes
    // -- SVGIsDefaultStyling: Enables default styling
    // --
    // -- **Initializes the CreateSVG instance and creates the root SVG element if it does not exist**
    constructor(SVGHTMLID, SVGAttributes, SVGIsDefaultStyling) {
        super(SVGHTMLID, SVGAttributes, SVGIsDefaultStyling);
        // -- root: Stores the main SVG element in the DOM
        this.root = null;
        this.createRootSVG();
    }
    // -- **Creates the root SVG element or retrieves it if it already exists**
    // -- **Applies attributes stored in the class and appends it to the DOM if needed**
    createRootSVG() {
        const currentSVG = document.getElementById(this.getSVGID);
        if (currentSVG) {
            this.root = currentSVG;
        }
        else {
            const SVGElement = document.createElementNS(SVG.getSVG_NS(), "svg");
            SVGElement.setAttribute("id", this.getSVGID);
            for (const [key, value] of Object.entries(this.getSVGAttributes)) {
                SVGElement.setAttribute(key, String(value));
            }
            document.body.appendChild(SVGElement);
            this.root = SVGElement;
        }
    }
    // -- elementName: The name of the SVG tag to be created (e.g. "circle", "rect", "line")
    // --
    // -- **Creates a new SVG element in the correct namespace**
    // -- **Returns the created element or null if creation fails**
    static createSVG_NS(elementName) {
        if (!elementName) {
            console.error("No element found!");
            return null;
        }
        return document.createElementNS(SVG.getSVG_NS(), elementName);
    }
    // -- elementName: The name of the SVG element to create (e.g. "circle", "rect", "path")
    // -- options: Optional key:value pairs applied as attributes to the created element
    // --
    // -- **Creates a single SVG element with optional attributes**
    // -- **Uses the private <createSVG_NS()> method to instantiate the element**
    // -- **Returns the created element or null if creation fails**
    static createSVGElement(elementName, options) {
        const element = this.createSVG_NS(elementName);
        if (!element) {
            console.error("There is no (elementName) available!");
            return null;
        }
        if (options) {
            for (const [key, value] of Object.entries(options)) {
                element.setAttribute(key, String(value));
            }
        }
        return element;
    }
    // -- **Returns the main SVG element stored in this instance**
    // -- **Uses the parent class method to retrieve the element by its ID**
    get getSVGElementRoot() {
        return this.getSVGHTMLIDElement();
    }
}
