import { Points } from "../../types/svg/path.properties.type.js";
import { CalcPathProperties } from "./calculations/CalcPathProperties.js";

/**
 * DeconstructPath
 * 
 * Beheert het ontleden en aanpassen van SVG path data:
 * - splitst een path op in losse coördinaten
 * - verandert Y-coördinaten
 * - bouwt nieuwe path strings
 */
export class DeconstructPath
{
    // Parseert een SVG-padstring en extraheert alleen de coördinaatparen achter 'M' en 'L'.
    // Elke keer dat een pad-commando wordt herkend, wordt het verzamelde coördinaatblok
    // omgezet naar een {x, y}-object. Aan het einde wordt het laatste blok ook verwerkt.
    // Output: een lijst met puntobjecten in de volgorde waarin ze in het pad voorkomen.
    public static getPathParts(path: string) 
    {
        const pathValues = ["M", "L"];
        const pathParts: Points = []; // [ {x: number; y: number}, ... ]

        let currentValues = "";

        for (const char of path) 
        {
            if (pathValues.includes(char)) 
            {
                if (currentValues.trim() !== "") 
                {
                    const [px, py] = currentValues.split(",").map(s => Number(s.trim()));
                    pathParts.push({ x: px, y: py });
                }
                currentValues = "";
                continue;
            }

            currentValues += char;
        }

        if (currentValues.trim() !== "") 
        {
            const [px, py] = currentValues.split(",").map(s => Number(s.trim()));
            pathParts.push({ x: px, y: py });
        }
        return pathParts;
    }   

    // Bouwt uit een lijst punten een valide SVG-pathstring op.
    // Het eerste punt wordt via een M-commando geplaatst en alle volgende
    // punten worden met L-commando’s verbonden. Hiermee ontstaat een gesloten of open polyline.
    public static createNewSVGPathString(points: Array<{ x: number; y: number }>): string
    {
        if (points.length === 0) 
            return ""

        const parts = [];
        const first = points[0];

        parts.push(`M${first.x},${first.y}`);

        for (let i = 1; i < points.length; i++) 
        {
            const p = points[i];
            parts.push(`L${p.x},${p.y}`);
        }

        return parts.join(" ");
    }

    // Past alleen de Y-waarden aan van punten die boven een berekende drempel liggen.
    // De drempel (getHalfwayYPointValues) bepaalt vanaf welke hoogte punten moeten zakken.
    // Elk punt waarvan de Y-waarde groter is dan deze drempel wordt met ‘substraction’
    // verlaagd. Daarna wordt een nieuwe pathstring opgebouwd op basis van de aangepaste punten.
    public static changeY(pathParts: Points, substraction: number): string | null
    {
        const newPathParts: Points = [];
        const getMaxValueY = CalcPathProperties.getHalfwayYPointValues(pathParts)

        if (!getMaxValueY)
            return null

        for (let i = 0; i < pathParts.length; i++) 
        {
            const current = { ...pathParts[i] };

            if (i < pathParts.length && current.y > getMaxValueY)
            {
                current.y -= substraction
                newPathParts.push(current);
                continue;
            }

            newPathParts.push(current);
        }

        const newStringPath = DeconstructPath.createNewSVGPathString(newPathParts)
        return newStringPath;
    }
}