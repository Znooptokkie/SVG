export class CalcCircleProperties {
    static calcCircleCircumference(radius) {
        const circumference = (radius * 2 * Math.PI);
        return parseFloat(circumference.toFixed(2));
    }
    static calcStrokeDasharray(dasharrayElement, circumference) {
        const availableRoom = (circumference - dasharrayElement);
        // console.log(`${dasharrayElement} ${availableRoom}`);
        return `${dasharrayElement} ${availableRoom}`;
    }
    static calcRadiusDifferenceAndWidth(strokeWidth, basicRadius) {
        return (strokeWidth / 2) + basicRadius;
    }
}
