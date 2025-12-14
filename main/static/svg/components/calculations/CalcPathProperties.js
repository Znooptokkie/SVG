import { CalcResizeContainer } from "../../education/CalcResizeContainer.js";
/**
 * CalcPathProperties
 *
 * Biedt methoden om SVG path eigenschappen te berekenen, zoals:
 * innerHeight van een container, viewbox aanpassingen en halfway Y-coördinaten.
 */
export class CalcPathProperties {
    // Haalt de hoogte van een gegeven HTML-element of container op via CalcResizeContainer.
    // Wordt gebruikt om de visuele hoogte van een innerlijke SVG- of contentcontainer te bepalen.
    static getInnerHeight(innerContent) {
        const svgHTMLInnerContainer = new CalcResizeContainer(`${innerContent}`);
        const svgHTMLInnerContainerHeight = svgHTMLInnerContainer.getContentHeight;
        return svgHTMLInnerContainerHeight;
    }
    // Converteert de innerHeight (in pixels) naar de bijbehorende SVG viewBox-hoogte
    // rekening houdend met de viewBox-to-PX ratio.
    static changeInnerHeigtToViewbox(innerHeight, viewboxToPXRatio) {
        return innerHeight / viewboxToPXRatio;
    }
    // Berekent het verschil tussen de totale viewBox hoogte en de som van innerHeight + andere elementen.
    // Wordt gebruikt om de ruimte over te houden of correcties toe te passen in het SVG-pad.
    static calcSubstractionViewbox(viewboxHeight, changedViewboxHeight, allButInnerHeight) {
        return Math.round(viewboxHeight - (changedViewboxHeight + allButInnerHeight));
    }
    // Geeft de halve Y-waarde terug van de hoogste Y-positie in een pad.
    // Wordt gebruikt als referentiepunt om punten boven of onder de helft van het pad te manipuleren.
    static getHalfwayYPointValues(pathParts) {
        if (!pathParts)
            return null;
        const maxValue = Math.max(...pathParts.map(obj => obj.y));
        return maxValue / 2;
    }
}
