export type Point = {x: number; y: number}
export type Points = Point[]

export type FourSides = {
    top: Point[];
    right: Point[];
    bottom: Point[];
    left: Point[];
};

export type FourSidesInner = {
    innerTop: Point[];
    innerRight: Point[];
    innerBottom: Point[];
    innerLeft: Point[];
};