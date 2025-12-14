import { CreateSVG } from "../../components/core/SVGCreate.js";
import { SVGFactory } from "../../components/core/SVGFactory.js";
/**
 * MainBorder
 *
 * Extends CreateSVG en vertegenwoordigt een hoofd-SVG container.
 * Verantwoordelijk voor het initialiseren van de basisstructuur van een section, inclusief een path contrast.
 */
export class MainBorder extends CreateSVG {
    constructor(HTMLId, svgAttributes, defaultStyling, sectionName, pathPoints) {
        // Roept de parent constructor aan van CreateSVG
        super(HTMLId, svgAttributes, defaultStyling);
        this.sectionName = sectionName;
        this.pathPoints = pathPoints;
    }
    // Maakt een contrasterende groep met pad voor de sectie (optioneel voor styling)
    createMainContainerContrast() {
        // Maak een <g> element aan voor de contrastlaag
        const contrastGroup = new SVGFactory(this, "g", {
            id: `${this.sectionName}-contrast`
        }).createSvgTag();
        // Voeg een <path> toe aan deze groep
        const contrastPath = new SVGFactory(contrastGroup, "path", {
            d: this.pathPoints, // De pad coördinaten
            fill: "none", // Geen vulling, enkel voor later styling of detectie
            stroke: "none", // Geen lijn
            "stroke-width": 1
        }).createSvgTag();
    }
    // Initialiseert de MainBorder, creëert de contrastlaag
    init() {
        this.createMainContainerContrast();
    }
    // Getter voor het pad van deze MainBorder
    get getPathPoints() {
        return this.pathPoints;
    }
}
