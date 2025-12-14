export class CalcPathProperties {
    static calcCornersMinusStrokeWidth(path, strokeWidth) {
        const halvedStrokeWidth = (strokeWidth / 2);
        for (const char of path) {
            // console.log(char);
            // const a: Array<string> = ["Z", "L", " ";]
            const startPath = "M";
            const startCoordinates = "L";
            // if (a.includes(char)) {
            // console.log(char);
            // continue
            // }
            // console.log(char);
        }
    }
    static calcSpaceBetweenBorders(firstPath, secPath) {
        // firstPath = 
    }
    static getPathParts(path) {
        const pathValues = ["M", "L"];
        const pathParts = [];
        let currentValues = "";
        for (const char of path) {
            if (pathValues.includes(char)) {
                if (currentValues.trim() !== "") {
                    const [px, py] = currentValues.split(",").map(s => Number(s.trim()));
                    pathParts.push({ x: px, y: py });
                }
                currentValues = "";
                continue;
            }
            currentValues += char;
        }
        if (currentValues.trim() !== "") {
            const [px, py] = currentValues.split(",").map(s => Number(s.trim()));
            pathParts.push({ x: px, y: py });
        }
        console.log(pathParts);
        return pathParts;
    }
}
