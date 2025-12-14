import { CreateSVG } from "../../components/core/SVGCreate.js";
import { SVGFactory } from "../../components/core/SVGFactory.js"

export class LanguageMainStyling
{
    public static createGradient(container: CreateSVG): void 
    {
        const defs = new SVGFactory(container, "defs").createSvgTag();

        const glassGradient = new SVGFactory(defs, "linearGradient", {
            id: "ultraDarkGlass",
            x1: "0%", y1: "0%",
            x2: "100%", y2: "100%"
        }).createSvgTag();

        new SVGFactory(glassGradient, "stop", {
            offset: "0%",
            "stop-color": "#03080f",
            "stop-opacity": "1"
        }).createSvgTag();

        new SVGFactory(glassGradient, "stop", {
            offset: "50%",
            "stop-color": "#03080f",
            "stop-opacity": "1"
        }).createSvgTag();

        new SVGFactory(glassGradient, "stop", {
            offset: "100%",
            "stop-color": "#03080f",
            "stop-opacity": "1"
        }).createSvgTag();


        const filter = new SVGFactory(defs, "filter", {
            id: "ultraDarkFrosted",
            x: "-50%", y: "-50%",
            width: "200%", height: "200%",
            filterUnits: "objectBoundingBox"
        }).createSvgTag();


        new SVGFactory(filter, "feGaussianBlur", {
            in: "SourceGraphic",
            stdDeviation: "6",
            result: "blur"
        }).createSvgTag();

        new SVGFactory(filter, "feColorMatrix", {
            in: "blur",
            type: "matrix",
            values: `
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.35 0
            `,
            result: "softened"
        }).createSvgTag();

        new SVGFactory(filter, "feBlend", {
            in: "SourceGraphic",
            in2: "softened",
            mode: "normal"
        }).createSvgTag();

const innerGradient = new SVGFactory(defs, "linearGradient", {
    id: "innerBorderGradient",
    x1: "0%",
    y1: "0%",
    x2: "100%",  // horizontaal in plaats van verticaal
    y2: "0%"
}).createSvgTag();

new SVGFactory(innerGradient, "stop", {
    offset: "0%",
    // "stop-color": "#1a2b46"
    // "stop-color": "#142137"
    "stop-color": "#101b2b",
}).createSvgTag();

new SVGFactory(innerGradient, "stop", {
    offset: "100%",
    "stop-color": "#010307"
}).createSvgTag();

    }
}
