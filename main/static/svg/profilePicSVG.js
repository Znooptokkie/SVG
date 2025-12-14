import { CreateSVG } from "./components/core/SVGCreate.js";
import { SVGFactory } from "./components/core/SVGFactory.js";
import { CalcCircleProperties } from "./components/calculations/CalcCircleProperties.js";
// Controleer of het SVG-element aanwezig is in de DOM en maak het aan
if (document.getElementById("profile-pic-svg")) {
    var htmlSVGElement = new CreateSVG("profile-pic-svg", {
        viewBox: "0 0 1200 1200",
        preserveAspectRatio: "xMidYMid meet"
    }, true);
}
// Radianwaarden en omtrek van cirkels berekenen
const radiusInner = 375;
const circumferenceInnerBorder = CalcCircleProperties.calcCircleCircumference(radiusInner);
const radiusSmallest = 375;
const circumferenceSmallest = CalcCircleProperties.calcCircleCircumference(radiusSmallest);
const radiusSmall = 390;
const circumferenceSmall = CalcCircleProperties.calcCircleCircumference(radiusSmall);
const radiusMedium = 395;
const circumferenceMedium = CalcCircleProperties.calcCircleCircumference(radiusMedium);
const radiusLarge = 400;
const circumferenceLarge = CalcCircleProperties.calcCircleCircumference(radiusLarge);
// Maak een clipPath aan voor de profielfoto
function createClipPath() {
    const newClipPathElement = new SVGFactory(htmlSVGElement, "clipPath", {
        id: "circle-inner"
    });
    newClipPathElement.createSvgTag();
    const newCircleInClipPath = new SVGFactory(newClipPathElement, "circle", {
        cx: 600,
        cy: 600,
        r: 300
    });
    newCircleInClipPath.createSvgTag();
}
// Dunne binnenrand van de profielfoto
function createThinInnerBorder() {
    const thinInnerGroupFactory = new SVGFactory(htmlSVGElement, "g", {
        class: "thin-inner-border-group"
    });
    const thinInnerGroup = thinInnerGroupFactory.createSvgTag();
    // Eerste cirkel
    const firstCircleBlockFactory = new SVGFactory(thinInnerGroup, "circle", {
        class: "thin-line-first",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 0.5)",
        "stroke-width": "30",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(600, circumferenceInnerBorder),
    });
    firstCircleBlockFactory.createSvgTag();
    // Tweede cirkel met dashoffset
    const secondCircleBlockFactory = new SVGFactory(thinInnerGroup, "circle", {
        class: "thin-line-second",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 0.5)",
        "stroke-width": "30",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(300, circumferenceInnerBorder),
        "stroke-dashoffset": 600,
    });
    secondCircleBlockFactory.createSvgTag();
    // Derde cirkel met dashoffset
    const thirdCircleBlock = new SVGFactory(thinInnerGroup, "circle", {
        class: "thin-line-third",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 0.5)",
        "stroke-width": "30",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(600, circumferenceInnerBorder),
        "stroke-dashoffset": 1500,
    });
    thirdCircleBlock.createSvgTag();
}
// Dikke binnenrand van de profielfoto
function createBigInnerBorder() {
    const bigInnerGroupFactory = new SVGFactory(htmlSVGElement, "g", {
        class: "big-inner-border-group"
    });
    const bigInnerGroup = bigInnerGroupFactory.createSvgTag();
    const firstCircleBlock = new SVGFactory(bigInnerGroup, "circle", {
        class: "big-line-first",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 1)",
        "stroke-width": "60",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(600, circumferenceInnerBorder),
    });
    firstCircleBlock.createSvgTag();
    const secondCircleBlock = new SVGFactory(bigInnerGroup, "circle", {
        class: "big-line-second",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 1)",
        "stroke-width": "60",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(200, circumferenceInnerBorder),
        "stroke-dashoffset": 750
    });
    secondCircleBlock.createSvgTag();
}
// Achtergrondcirkels rond de profielfoto
function createBackgroundBlocks() {
    const backgroundGroupFactory = new SVGFactory(htmlSVGElement, "g", {
        class: "background-group"
    });
    const backgroundGroup = backgroundGroupFactory.createSvgTag();
    // Herhaalde achtergrondcirkels met verschillende stroke-width, radius en dashoffset
    const circleConfigs = [
        { r: radiusSmallest, width: 140, dash: 100, offset: 0, class: "background-first bg-child" },
        { r: radiusSmall, width: 360, dash: 120, offset: 135, class: "background-second bg-child" },
        { r: radiusMedium, width: 120, dash: 120, offset: 270, class: "background-third bg-child" },
        { r: radiusMedium, width: 220, dash: 120, offset: 400, class: "background-fourth bg-child" },
        { r: radiusLarge, width: 80, dash: 120, offset: 535, class: "background-fifth bg-child" },
        { r: radiusLarge, width: 270, dash: 120, offset: 665, class: "background-sixth bg-child" },
        { r: radiusLarge, width: 120, dash: 120, offset: 795, class: "background-seventh bg-child" },
        { r: radiusLarge, width: 60, dash: 120, offset: 925, class: "background-eigth bg-child" },
        { r: radiusSmallest, width: 400, dash: 120, offset: 1000, class: "background-ninth bg-child" },
        { r: radiusMedium, width: 60, dash: 80, offset: 1145, class: "background-tenth bg-child" },
        { r: radiusLarge, width: 400, dash: 100, offset: 1270, class: "background-eleventh bg-child" },
        { r: radiusLarge, width: 180, dash: 100, offset: 1380, class: "background-twelfth bg-child" },
        { r: radiusLarge, width: 80, dash: 120, offset: 1510, class: "background-thirtheenth bg-child" },
        { r: radiusLarge, width: 380, dash: 120, offset: 1640, class: "background-fourteenth bg-child" },
        { r: radiusLarge, width: 60, dash: 140, offset: 1790, class: "background-fifteenth bg-child" },
        { r: radiusLarge, width: 120, dash: 140, offset: 1940, class: "background-sixteenth bg-child" },
        { r: radiusLarge, width: 350, dash: 140, offset: 2090, class: "background-seventeenth bg-child" },
        { r: radiusLarge, width: 80, dash: 140, offset: 2240, class: "background-eigthteenth bg-child" },
        { r: radiusLarge, width: 60, dash: 140, offset: 2395, class: "background-nineteenth bg-child" }
    ];
    for (const cfg of circleConfigs) {
        const circle = new SVGFactory(backgroundGroup, "circle", {
            class: cfg.class,
            cx: "600",
            cy: "600",
            r: cfg.r,
            stroke: "rgba(46, 204, 113, 0.1)",
            "stroke-width": cfg.width,
            fill: "none",
            "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(cfg.dash, CalcCircleProperties.calcCircleCircumference(cfg.r)),
            "stroke-dashoffset": cfg.offset
        });
        circle.createSvgTag();
    }
}
// Voeg afbeelding toe binnen clipPath
function imageElement() {
    const image = new SVGFactory(htmlSVGElement, "image", {
        class: "svg-image",
        href: "./static/images/Person-tree.webp",
        x: 300,
        y: 300,
        width: 600,
        height: 600,
        "clip-path": "url(#circle-inner)",
        preserveAspectRatio: "xMidYMid slice"
    });
    image.createSvgTag();
}
// Initialiseer en maak alle SVG-elementen
export function callAllInstances() {
    createClipPath();
    createThinInnerBorder();
    createBigInnerBorder();
    createBackgroundBlocks();
    imageElement();
}
