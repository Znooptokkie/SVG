/**
 * CalcCircleProperties
 * 
 * Biedt statische methoden om eigenschappen van cirkels te berekenen, zoals:
 * omtrek, stroke-dasharray, en de aanpassing van radius bij stroke-width.
 */
export class CalcCircleProperties
{
    // Bereken de omtrek van een cirkel op basis van de straal.
    // Rond het resultaat af op twee decimalen voor precisie bij SVG-berekeningen.
    public static calcCircleCircumference(radius: number): number
    {
        const circumference = radius * 2 * Math.PI;
        return parseFloat(circumference.toFixed(2));
    }

    // Bereken de stroke-dasharray string voor een SVG-cirkel.
    // De eerste waarde is de lengte van het zichtbare segment,
    // de tweede waarde is de resterende lengte van de cirkel (gap).
    public static calcStrokeDasharray(dasharrayElement: number, circumference: number): string
    {
        const availableRoom = circumference - dasharrayElement;
        return `${dasharrayElement} ${availableRoom}`;
    }

    // Bereken de effectieve straal van een cirkel inclusief de helft van de stroke-width.
    // Dit is nodig voor correcte positionering in SVG zodat de stroke binnen het gewenste gebied valt.
    public static calcRadiusDifferenceAndWidth(strokeWidth: number, basicRadius: number): number
    {
        return (strokeWidth / 2) + basicRadius;
    }
}
