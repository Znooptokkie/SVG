import { CreateSVG } from "./SVGCreate.js";
export class SVGFactory {
    // -- parentSVG: The parent to which the created element will be appended
    // -- SVGNSParam: The type of SVG element to create (e.g., "circle", "rect")
    // -- options: Optional key:value pairs applied as attributes to the created element
    constructor(parentSVG, SVGNSParam, options) {
        this.parentSVG = parentSVG;
        this.SVGNSParam = SVGNSParam;
        this.options = options;
        // -- SVGElement: The SVG element created by this factory
        this.SVGElement = null;
        this.SVGNSParam = SVGNSParam;
        this.options = options;
    }
    // -- **Creates the specified SVG element**
    // -- **Appends it to the resolved parent (CreateSVG, SVGFactory, or SVGElement)**
    // -- **If creation fails or parent cannot be resolved, logs an error**
    // --
    // -- return: The created SVG element or null if creation/appending fails
    createSvgTag() {
        if (!this.SVGElement) {
            this.SVGElement = CreateSVG.createSVGElement(this.SVGNSParam, this.options);
            if (!this.SVGElement) {
                console.error(`Can't create <${this.SVGNSParam}> tag or parent SVG is missing.`);
                return null;
            }
            let parent = null;
            if (this.parentSVG instanceof CreateSVG) {
                parent = this.parentSVG.getSVGElementRoot;
            }
            else if (this.parentSVG instanceof SVGFactory) {
                parent = this.parentSVG.getSVGElement;
            }
            else if (this.parentSVG instanceof SVGElement) {
                parent = this.parentSVG;
            }
            if (!parent) {
                console.error("Can't find parent SVG element.");
                return null;
            }
            parent.appendChild(this.SVGElement);
        }
        return this.SVGElement;
    }
    // -- **Getter for the created SVG element**
    get getSVGElement() {
        return this.SVGElement;
    }
}
