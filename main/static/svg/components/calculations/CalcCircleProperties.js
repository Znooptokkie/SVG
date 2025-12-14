/**
 * CalcCircleProperties
 *
 * Biedt statische methoden om eigenschappen van cirkels te berekenen, zoals:
 * omtrek, stroke-dasharray, en de aanpassing van radius bij stroke-width.
 */
export class CalcCircleProperties {
    // Bereken de omtrek van een cirkel op basis van de straal.
    // Rond het resultaat af op twee decimalen voor precisie bij SVG-berekeningen.
    static calcCircleCircumference(radius) {
        const circumference = radius * 2 * Math.PI;
        return parseFloat(circumference.toFixed(2));
    }
    // Bereken de stroke-dasharray string voor een SVG-cirkel.
    // De eerste waarde is de lengte van het zichtbare segment,
    // de tweede waarde is de resterende lengte van de cirkel (gap).
    static calcStrokeDasharray(dasharrayElement, circumference) {
        const availableRoom = circumference - dasharrayElement;
        return `${dasharrayElement} ${availableRoom}`;
    }
    // Bereken de effectieve straal van een cirkel inclusief de helft van de stroke-width.
    // Dit is nodig voor correcte positionering in SVG zodat de stroke binnen het gewenste gebied valt.
    static calcRadiusDifferenceAndWidth(strokeWidth, basicRadius) {
        return (strokeWidth / 2) + basicRadius;
    }
}
