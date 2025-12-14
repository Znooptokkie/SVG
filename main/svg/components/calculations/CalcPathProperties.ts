import { CalcResizeContainer } from "../../education/CalcResizeContainer.js"
import { Points } from "../../../types/svg/path.properties.type.js"

/**
 * CalcPathProperties
 * 
 * Biedt methoden om SVG path eigenschappen te berekenen, zoals:
 * innerHeight van een container, viewbox aanpassingen en halfway Y-coördinaten.
 */
export class CalcPathProperties
{
    // Haalt de hoogte van een gegeven HTML-element of container op via CalcResizeContainer.
    // Wordt gebruikt om de visuele hoogte van een innerlijke SVG- of contentcontainer te bepalen.
    public static getInnerHeight(innerContent: string)
    {
        const svgHTMLInnerContainer = new CalcResizeContainer(`${innerContent}`)
        const svgHTMLInnerContainerHeight = svgHTMLInnerContainer.getContentHeight
        return svgHTMLInnerContainerHeight
    }

    // Converteert de innerHeight (in pixels) naar de bijbehorende SVG viewBox-hoogte
    // rekening houdend met de viewBox-to-PX ratio.
    public static changeInnerHeigtToViewbox(innerHeight: number, viewboxToPXRatio: number)
    {
        return innerHeight / viewboxToPXRatio
    }

    // Berekent het verschil tussen de totale viewBox hoogte en de som van innerHeight + andere elementen.
    // Wordt gebruikt om de ruimte over te houden of correcties toe te passen in het SVG-pad.
    public static calcSubstractionViewbox(viewboxHeight: number, changedViewboxHeight: number, allButInnerHeight: number)
    {
        return Math.round(viewboxHeight - (changedViewboxHeight + allButInnerHeight))
    }

    // Geeft de halve Y-waarde terug van de hoogste Y-positie in een pad.
    // Wordt gebruikt als referentiepunt om punten boven of onder de helft van het pad te manipuleren.
    public static getHalfwayYPointValues(pathParts: Points): number | null
    {
        if (!pathParts)
            return null

        const maxValue = Math.max(...pathParts.map(obj => obj.y))
        return maxValue / 2
    }
}
