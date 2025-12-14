import { SVGFactory } from "./core/SVGFactory.js";
import { PathFigures } from "./PathFigures.js";
/**
 * InitPath
 *
 * Zorgt voor het creëren van de daadwerkelijke border parts binnen een SVG container
 * op basis van outer en inner paths.
 */
export class InitPath {
    // Bouwt alle zichtbare segmenten voor de rand van een SVG-pad.
    // Ontvangt zowel de buitenste als de binnenste pad-string en genereert:
    // 1) een <g>-element voor de binnenste vorm
    // 2) losse pad-segmenten die de border-vlakken vormen.
    // Als één van de pad-strings ontbreekt stopt de functie direct.
    static createBorderParts(container, outer, inner, category) {
        if (!inner || !outer)
            return null;
        // Berekent de afzonderlijke segmenten tussen inner en outer voor visuele border-opbouw
        const getFiguresPath = PathFigures.createFigurePathString(inner, outer);
        if (!getFiguresPath)
            return null;
        // Groepeert de binnenste vorm in een eigen <g>-element
        const innerGroup = new SVGFactory(container, "g", {
            class: `${category}-inner`
        }).createSvgTag();
        // Render de binnenrand als één pad met een gedefinieerde fill
        new SVGFactory(innerGroup, "path", {
            d: inner,
            // fill: "#000214",
            fill: "url(#ultraDarkGlass)",
            // filter: "url(#ultraDarkFrosted) url(#borderSegmentShadow)",
            stroke: "none",
        }).createSvgTag();
        let counter = 0;
        // Doorloop alle berekende segmenten en genereer voor elk segment een afzonderlijk pad
        // Dit creëert de visuele border-opdeling rondom het figuur
        for (const figure of getFiguresPath) {
            // let color = counter < 12 ? "#01030a" : "#000214";
            // let color = counter < 12 ? "#010307" : "#010307"
            let color = counter < 12 ? "#0a121c" : "#010307";
            const createfigurePath = new SVGFactory(container, "path", {
                class: `figure-${counter}`,
                d: `${figure}Z`, // Sluit segment af
                stroke: "rgba(51, 81, 142, 0.5)",
                // stroke: "#010307",
                "stroke-width": 1,
                opacity: "1",
                // fill: "url(#innerBorderGradient)",
                // fill: "none",
                fill: "#000214",
                // filter: "url(#ultraDark)",
            });
            counter++;
            createfigurePath.createSvgTag();
        }
    }
}
