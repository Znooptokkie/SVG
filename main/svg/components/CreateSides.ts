import { FourSides, FourSidesInner } from "../../types/svg/path.properties.type.js"
import { DeconstructPath } from "./DeconstructPath.js"

export class CreateSides
{
    // Haalt alle punten uit het oorspronkelijke pad op en verdeelt deze in vier zijdes:
    // top, right, bottom en left. Zorgt dat het pad sluit zonder dubbele laatste punten.
    public static getEachSide(path: string): FourSides | null 
    {
        const basePath = path

        if (!basePath)
            return null

        const outerPathArray = DeconstructPath.getPathParts(basePath) // Parse de volledige PATH-string naar losse punten
        const filteredLastItem = [...outerPathArray]

        // Verwijder het laatste punt als dit exact gelijk is aan het beginpunt
        if (
            filteredLastItem.length > 1 && 
            filteredLastItem[0].x === filteredLastItem[filteredLastItem.length - 1].x &&
            filteredLastItem[0].y === filteredLastItem[filteredLastItem.length - 1].y 
        )
        {
            filteredLastItem.pop()
        }

        const borderTop =    []
        const borderRight =  []
        const borderBottom = []
        const borderLeft =   []

        const xPoints = outerPathArray.map(p => p.x) // Verzamel alle X-coördinaten
        const yPoints = outerPathArray.map(p => p.y) // Verzamel alle Y-coördinaten

        const minX = Math.min(...xPoints) // Linkergrens
        const maxX = Math.max(...xPoints) // Rechtergrens
        const minY = Math.min(...yPoints) // Bovengrens
        const maxY = Math.max(...yPoints) // Ondergrens

        // Doorloop alle punten en bepaal per punt tot welke zijde het hoort.
        // Voor elk punt wordt de afstand berekend tot de vier uiterste grenzen (minY, maxY, minX, maxX).
        // De zijde met de kleinste afstand bepaalt waar het punt geometrisch het dichtst bij ligt,
        // waardoor het punt wordt toegewezen aan top, right, bottom of left.
        for (let i = 0; i < filteredLastItem.length; i++)
        {
            const point = filteredLastItem[i]
        
            const distanceTop    = Math.abs(point.y - minY)
            const distanceBottom = Math.abs(point.y - maxY)
            const dLeft          = Math.abs(point.x - minX)
            const distanceRight  = Math.abs(point.x - maxX)
        
            const smallest = Math.min(distanceTop, distanceBottom, dLeft, distanceRight)

            // Kleinste afstand bepaalt tot welke zijde het punt behoort
            switch (smallest) 
            {
                case distanceTop:
                    borderTop.push(point)
                    continue

                case distanceRight:
                    borderRight.push(point)
                    continue

                case distanceBottom:
                    borderBottom.push(point)
                    continue

                default:
                    borderLeft.push(point)
            }
        }

        return {
            top: borderTop,
            right: borderRight,
            bottom: borderBottom,
            left: borderLeft
        }
    }
    
    // Berekent de offset-versie van alle zijdes en geeft nieuwe punten terug voor de binnenste contour
    public static mutateOffsetPath(sides: FourSides, offset: number): FourSidesInner 
    {
        const minYTop  = Math.min(...sides.top.map(p => p.y)) // Hoogste punt van de bovenrand
        const maxXRight = Math.max(...sides.right.map(p => p.x)) // Verst uitstekende X op de rechterrand
        const maxYBottom = Math.max(...sides.bottom.map(p => p.y)) // Laagste punt van de onderrand
        const minXLeft = Math.min(...sides.left.map(p => p.x)) // Verst naar links uitstekende X op de linkerrand
    
        const innerTop = []
        const innerRight = []
        const innerBottom = []
        const innerLeft = []

        // Verwerk alle punten van de bovenkant en verschuif ze naar binnen
        if (sides.top)
        {
            // Als er maar 1 item in de Array staat
            if (sides.top.length <= 1)
            {
                const newPoints = {
                    x: sides.top[0].x - offset * 2, // Compenseert horizontale inwaartse verschuiving
                    y: sides.top[0].y + offset // Schuift lijn naar beneden
                }
                innerTop.push(newPoints)
            }

            for (let i = 0; i < sides.top.length - 1; i++)
            {
                if (sides.top[i].y === sides.top[i + 1].y) // Alleen verwerken als lijn horizontaal is
                {
                    if (sides.top[i].y === minYTop && sides.top[i + 1].y === minYTop)
                    {
                        const newFirstPoints = { 
                            x: sides.top[i].x + offset, 
                            y: sides.top[i].y + offset * 2 // Duwt de volledige bovenrand naar binnen
                        }
                        const newSecondPoints = { 
                            x: sides.top[i + 1].x - offset, 
                            y: sides.top[i + 1].y + offset * 2 
                        }

                        innerTop.push(newFirstPoints, newSecondPoints)
                    }
                    else
                    {
                        const newFirstPoints = { 
                            x: sides.top[i].x - offset, 
                            y: sides.top[i].y + offset * 2 // Corrigeert afwijkende vormen in de bovenrand
                        }               
                        const newSecondPoints = { 
                            x: sides.top[i + 1].x + offset, 
                            y: sides.top[i + 1].y + offset * 2
                        }

                        innerTop.push(newFirstPoints, newSecondPoints)
                    }
                }
            }
        }
        
        // Verwerk rechterkant en verschuif verticaal naar binnen
        if (sides.right)
        {
            if (sides.right.length <= 1)
            {
                const newPoints = {
                    x: sides.right[0].x - offset * 2, // Schuift rechterrand naar links
                    y: sides.right[0].y - offset // Past verticale richting aan
                }
                innerRight.push(newPoints)
            }

            for (let i = 0; i < sides.right.length - 1; i++)
            {
                if (sides.right[i].x ===  sides.right[i + 1].x) // Alleen verticale lijnen
                {
                    if (sides.right[i].x === maxXRight && sides.right[i + 1].x === maxXRight)
                    {
                        const newFirstPoints = { 
                            x: sides.right[i].x - offset * 2, 
                            y: sides.right[i].y + offset
                        }
                        const newSecondPoints = { 
                            x: sides.right[i + 1].x - offset * 2, 
                            y: sides.right[i + 1].y - offset
                        }

                        innerRight.push(newFirstPoints, newSecondPoints)
                    }
                    else
                    {
                        const newFirstPoints = { 
                            x: sides.right[i].x - offset * 2, 
                            y: sides.right[i].y - offset
                        }               
                        const newSecondPoints = { 
                            x: sides.right[i + 1].x - offset * 2, 
                            y: sides.right[i + 1].y + offset
                        }

                        innerRight.push(newFirstPoints, newSecondPoints)
                    }
                }
            }
        }

        // Verwerk onderkant en verschuif naar boven
        if (sides.bottom)
        {
            if (sides.bottom.length <= 1)
            {
                const newPoints = {
                    x: sides.bottom[0].x + offset,  // Schuift horizontaal naar binnen
                    y: sides.bottom[0].y - offset * 2 // Duwt onderrand omhoog
                }
                innerBottom.push(newPoints)
            }

            for (let i = 0; i < sides.bottom.length - 1; i++)
            {
                if (sides.bottom[i].y === sides.bottom[i + 1].y)
                {       
                    if (
                        sides.bottom[i].y === maxYBottom && 
                        sides.bottom[i + 1].y === maxYBottom
                    )
                    {
                        const newFirstPoints = { 
                            x: sides.bottom[i].x - offset, 
                            y: sides.bottom[i].y - offset * 2 
                        }
                        const newSecondPoints = { 
                            x: sides.bottom[i + 1].x + offset, 
                            y: sides.bottom[i + 1].y - offset * 2 
                        }

                        innerBottom.push(newFirstPoints, newSecondPoints)
                    }
                    else
                    {
                        const newFirstPoints = { 
                            x: sides.bottom[i].x + offset, 
                            y: sides.bottom[i].y - offset * 2
                        }               
                        const newSecondPoints = { 
                            x: sides.bottom[i + 1].x - offset, 
                            y: sides.bottom[i + 1].y - offset * 2
                        }

                        innerBottom.push(newFirstPoints, newSecondPoints)
                    }
                }
            }
        }

        // Verwerk linkerkant en verschuif naar rechts
        if (sides.left)
        {
            if (sides.left.length <= 1)
            {
                const newPoints = {
                    x: sides.left[0].x + offset * 2, // Duwt linkerrand naar rechts
                    y: sides.left[0].y - offset // Corrigeert verticaal
                }
                innerLeft.push(newPoints)
            }
            
            for (let i = 0; i < sides.left.length - 1; i++)
            {
                if (sides.left[i].x ===  sides.left[i + 1].x)
                {
                    if (
                        sides.left[i].x === minXLeft && 
                        sides.left[i + 1].x === minXLeft
                    )
                    {
                        const newFirstPoints = { 
                            x: sides.left[i].x + offset * 2, 
                            y: sides.left[i].y - offset
                        }
                        const newSecondPoints = { 
                            x: sides.left[i + 1].x + offset * 2, 
                            y: sides.left[i + 1].y + offset
                        }

                        innerLeft.push(newFirstPoints, newSecondPoints)
                    }
                    else
                    {
                        const newFirstPoints = { 
                            x: sides.left[i].x + offset * 2, 
                            y: sides.left[i].y + offset
                        }               
                        const newSecondPoints = { 
                            x: sides.left[i + 1].x + offset * 2, 
                            y: sides.left[i + 1].y - offset
                        }

                        innerLeft.push(newFirstPoints, newSecondPoints)
                    }
                }
            }

            // Sluit de binnenste contour aan op het eerste punt van de bovenrand
            innerLeft.push(innerTop[0])
        }

        // console.log({innerTop, innerRight, innerBottom, innerLeft})
        return { innerTop, innerRight, innerBottom, innerLeft }
    }

    // Merge alle nieuwe inner waardes tot 1 Array
    public static mergePathArray(sides: FourSidesInner): Array<{ x: number, y: number }>
    {
        const newPath: Array<{ x: number, y: number }> = [
            ...sides.innerTop,
            ...sides.innerRight,
            ...sides.innerBottom,
            ...sides.innerLeft
        ]

        return newPath
    }
}