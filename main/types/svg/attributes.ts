import { SVGGlobalAttributes } from "./attributes.global.type";

export type SVGCircleAttributes = SVGGlobalAttributes & {
    cx?: string | number;
    cy?: string | number;
    r?: string | number;
};

export type SVGRectAttributes = SVGGlobalAttributes & {
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
    rx?: string | number;
    ry?: string | number;
};

export type SVGEllipseAttributes = SVGGlobalAttributes & {
    cx?: string | number;
    cy?: string | number;
    rx?: string | number;
    ry?: string | number;
};



export type SVGLineAttributes = SVGGlobalAttributes & {
    x1?: string | number;
    y1?: string | number;
    x2?: string | number;
    y2?: string | number;
};

export type SVGPathAttributes = SVGGlobalAttributes & {
    d?: string;
    filter?: string;
};



export type SVGPolygonAttributes = SVGGlobalAttributes & {
    points?: string;
};

export type SVGPolylineAttributes = SVGGlobalAttributes & {
    points?: string;
};



export type SVGImageAttributes = SVGGlobalAttributes & {
    href?: string;
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
    preserveAspectRatio?: string;
    "clip-path": string;
};

export type SVGTextAttributes = SVGGlobalAttributes & {
    x?: string | number;
    y?: string | number;
    dx?: string | number;
    dy?: string | number;
    textLength?: string | number;
    lengthAdjust?: "spacing" | "spacingAndGlyphs";
};