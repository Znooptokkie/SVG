import { SVGFactory } from "../components/core/SVGFactory.js";
import { InitPath } from "../components/InitPath.js";
import { CreateEducation } from "./CreateEducation.js";
// Basis paden en padding voor alle education SVGs
const MAIN_PATH = "M25,0 L975,0 L1000,25 L1000,575 L975,600 L25,600 L0,575 L0,25 L25,0";
const INNER_CONTENT_PATH = "M27,100 L973,100 L973,565 L963,575 L37,575 L27,565 L27,100";
const BORDER_OUTER_PADDING = 3;
// Creëert de SVG voor Software Developer opleiding
function createSWD() {
    const SWDInstance = new CreateEducation("education-svg", "education-content");
    // Bouw offset path voor buitenrand
    const SWDOffsetPath = SWDInstance.buildOffsetPath(MAIN_PATH, BORDER_OUTER_PADDING);
    // Pas Y-waarden aan voor buitenpad
    SWDInstance.newOuterPath = SWDInstance.changeValueY(MAIN_PATH);
    SWDInstance.newOuterOffsetPath = SWDInstance.changeValueY(SWDOffsetPath);
    // Bereken nieuwe totale viewBox hoogte
    SWDInstance.calcNewTotalViewboxHeight();
    const SWDContainer = SWDInstance.createContainer();
    SWDContainer?.init();
    // Pas inner pad en offset aan
    SWDInstance.newInnerPath = SWDInstance.changeValueY(INNER_CONTENT_PATH);
    SWDInstance.newInnerOffsetPath = SWDInstance.hardcodedOffset();
    // Voeg titel toe
    const SWDTitleTEST = new SVGFactory(SWDContainer, "text", {
        x: 50,
        y: 60,
        "font-size": 24,
        fill: "rgba(51, 81, 142, 1)",
    }).createSvgTag();
    SWDTitleTEST.textContent = "MBO 4 | Software Developer";
    SWDTitleTEST.style.fontWeight = "bold";
    // Voeg subtitel toe
    const SWDSubtitleTEST = new SVGFactory(SWDContainer, "text", {
        x: 800,
        y: 60,
        "font-size": 24,
        fill: "rgba(51, 81, 142, 1)",
    }).createSvgTag();
    SWDSubtitleTEST.textContent = "2022 - 2025";
    const figureGroupFactory = new SVGFactory(SWDContainer, "g", {
        class: "education-figure-group"
    });
    const figureGroup = figureGroupFactory.createSvgTag();
    // Bouw buiten- en binnenranden
    InitPath.createBorderParts(figureGroup, SWDInstance.newOuterPath, SWDInstance.newOuterOffsetPath, "education");
    InitPath.createBorderParts(figureGroup, SWDInstance.newInnerPath, SWDInstance.newInnerOffsetPath, "education");
}
// Initieert alle education SVG-secties
export function educationInit() {
    createSWD();
}
