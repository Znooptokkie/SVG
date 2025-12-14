import { CreateSVG } from "./SVGCreate.js";
import { SVGFactory } from "./SVGFactory.js";
import { SVGPathAttributes } from "../../../types/svg/attributes.js";

/**
 * MainBorder
 * 
 * Extends CreateSVG en vertegenwoordigt een hoofd-SVG container.
 * Verantwoordelijk voor het initialiseren van de basisstructuur van een section, inclusief een path contrast.
 */
export class MainBorder extends CreateSVG
{
    public sectionName: string; // Naam van de sectie (bijv. 'language', 'education')
    private pathPoints: string; // De SVG pad string voor deze sectie

    constructor(
        HTMLId: string, 
        svgAttributes: Record<string, string>, 
        defaultStyling: boolean, 
        sectionName: string, 
        pathPoints: string
    )
    {
        // Roept de parent constructor aan van CreateSVG
        super(HTMLId, svgAttributes, defaultStyling);
        this.sectionName = sectionName;
        this.pathPoints = pathPoints;
    }

    // Maakt een contrasterende groep met pad voor de sectie (optioneel voor styling)
    private createMainContainerContrast(): void
    {
        // Maak een <g> element aan voor de contrastlaag
        const contrastGroup = new SVGFactory(this, "g", {
            id: `${this.sectionName}-contrast`
        }).createSvgTag();

        // Voeg een <path> toe aan deze groep
        const contrastPath = new SVGFactory<SVGPathAttributes>(contrastGroup, "path", {
            d: this.pathPoints,        // De pad coördinaten
            fill: "none",              // Geen vulling, enkel voor later styling of detectie
            stroke: "none",            // Geen lijn
            "stroke-width": 1
        }).createSvgTag();
    }

    // Initialiseert de MainBorder, creëert de contrastlaag
    public init(): void
    {
        this.createMainContainerContrast();
    }

    // Getter voor het pad van deze MainBorder
    public get getPathPoints(): string
    {
        return this.pathPoints;
    }
}
