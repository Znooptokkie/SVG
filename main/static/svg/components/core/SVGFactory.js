import { CreateSVG } from "./SVGCreate.js";
/**
 * SVGFactory
 *
 * Algemene factory class voor het creëren van SVG elementen binnen een container:
 * - ondersteunt circle, path, rect, text, image, foreignObject, g
 * - kan attributen en styles instellen
 */
export class SVGFactory {
    constructor(parentSVG, SVGNSParam, options) {
        this.parentSVG = parentSVG;
        this.SVGNSParam = SVGNSParam;
        this.options = options;
        this.SVGElement = null;
        this.SVGNSParam = SVGNSParam;
        this.options = options;
    }
    // Produceert een nieuw SVG-element aan de hand van de opgegeven tagnaam en attributen.
    // Wanneer het element nog niet eerder is aangemaakt, wordt het opgebouwd via CreateSVG.createSVGElement().
    // Vervolgens wordt bepaald welke ouder gebruikt moet worden:
    // - de root-SVG wanneer parentSVG een CreateSVG-instantie is,
    // - het reeds gecreëerde element van een andere SVGFactory,
    // - of een direct meegegeven SVGElement.
    // Alleen wanneer er een geldig parent-element gevonden wordt, wordt het nieuwe SVG-element toegevoegd.
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
                return null;
            }
            parent.appendChild(this.SVGElement);
        }
        return this.SVGElement;
    }
    get getSVGElement() {
        return this.SVGElement;
    }
}
