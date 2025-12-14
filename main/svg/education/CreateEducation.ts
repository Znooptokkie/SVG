import { MainBorder } from "../components/core/MainBorder.js";
import { DeconstructPath } from "../components/DeconstructPath.js";
import { CalcPathProperties } from "../components/calculations/CalcPathProperties.js"
import { CreateSides } from "../components/CreateSides.js";

/**
 * CreateEducation
 * 
 * Beheert het opbouwen van een educatie-SVG container. 
 * Verwerkt zowel outer als inner paths, offsets en viewbox berekeningen.
 * Ook verantwoordelijk voor het toevoegen van teksten binnen de SVG.
 */
export class CreateEducation {
    // Interne paden en viewBox-parameters voor de container en content
    private MAIN_PATH: string
    private INNER_PATH: string
    private VIEWBOX_HEIGHT: number
    private VIEWBOX_WIDTH: number
    private VIEWBOX_TO_PX_RATIO: number
    private ALL_BUT_INNER_HEIGHT_VIEWBOX: number
    private BORDER_OUTER_PADDING: number
    private BORDER_INNER_PADDING: number
    private CONTENT_MARGIN: number

    // HTML-referenties
    private HTMLID: string
    private HTMLContentClass: string

    // Berekende viewBox hoogte na aanpassingen
    private newTotalViewboxHeight: number | null = null

    // Output paden en offsets
    public newOuterPath: string | null = null
    public newOuterOffsetPath: string | null = null
    public newInnerPath: string | null = null
    public newInnerOffsetPath: string | null = null

    private container: MainBorder | null = null

    // Initialiseert de class met HTML-referenties en optionele parameters
    constructor(
        HTMLID: string,
        HTMLContentClass: string,
        optional: 
        {
            MAIN_PATH?: string
            INNER_PATH?: string
            VIEWBOX_HEIGHT?: number
            VIEWBOX_WIDTH?: number
            VIEWBOX_TO_PX_RATIO?: number
            ALL_BUT_INNER_HEIGHT_VIEWBOX?: number
            BORDER_OUTER_PADDING?: number
            BORDER_INNER_PADDING?: number
            CONTENT_MARGIN?: number
        } = {}
    ) {
        this.HTMLID = HTMLID
        this.HTMLContentClass = HTMLContentClass

        // Standaardwaarden worden gebruikt wanneer optionele waarden ontbreken
        this.MAIN_PATH = optional.MAIN_PATH ?? "M25,0 L975,0 L1000,25 L1000,575 L975,600 L25,600 L0,575 L0,25 L25,0"
        this.INNER_PATH = optional.INNER_PATH ?? "M27,100 L973,100 L973,565 L963,575 L37,575 L27,565 L27,100"
        this.VIEWBOX_HEIGHT = optional.VIEWBOX_HEIGHT ?? 600
        this.VIEWBOX_WIDTH = optional.VIEWBOX_WIDTH ?? 1000
        this.VIEWBOX_TO_PX_RATIO = optional.VIEWBOX_TO_PX_RATIO ?? 1.2
        this.ALL_BUT_INNER_HEIGHT_VIEWBOX = optional.ALL_BUT_INNER_HEIGHT_VIEWBOX ?? 133
        this.BORDER_OUTER_PADDING = optional.BORDER_OUTER_PADDING ?? 3
        this.BORDER_INNER_PADDING = optional.BORDER_INNER_PADDING ?? 2
        this.CONTENT_MARGIN = optional.CONTENT_MARGIN ?? 30
    }

    // Bouwt een offset pad voor een gegeven path en padding
    public buildOffsetPath(path: string, padding: number): string
    {
        const newPath = CreateSides.getEachSide(path)
        const createInnerPath =  CreateSides.mutateOffsetPath(newPath!, padding)
        const mergedArray = CreateSides.mergePathArray(createInnerPath)
        const pathToString = DeconstructPath.createNewSVGPathString(mergedArray)

        return pathToString
    }

    // Bereken de benodigde viewBox-subtractie op basis van innerHeight en ratio
    public calcViewboxSubstraction(): number
    {
        const innerHeight = CalcPathProperties.getInnerHeight(`.${this.HTMLContentClass}`)
        const viewboxHeightChanged = CalcPathProperties.changeInnerHeigtToViewbox(innerHeight, this.VIEWBOX_TO_PX_RATIO)
        const calcViewboxSubstraction = CalcPathProperties.calcSubstractionViewbox(this.VIEWBOX_HEIGHT, viewboxHeightChanged, this.ALL_BUT_INNER_HEIGHT_VIEWBOX) - this.CONTENT_MARGIN

        return calcViewboxSubstraction
    }

    // Bereken de nieuwe totale viewBox hoogte na aftrek van substracties
    public calcNewTotalViewboxHeight(): number
    {
        const newViewboxHeight = this.VIEWBOX_HEIGHT - this.calcViewboxSubstraction()
        this.newTotalViewboxHeight = newViewboxHeight

        return this.newTotalViewboxHeight
    }

    // Creëert de MainBorder container met de nieuwe viewBox hoogte
    public createContainer(): MainBorder | null
    {
        let container: MainBorder | null = null

        if (this.getHTMLTagElement())
        {
            container = new MainBorder(
                `${this.HTMLID}`,
                {
                    viewBox: `0 0 ${this.VIEWBOX_WIDTH} ${this.newTotalViewboxHeight}`,
                    preserveAspectRatio: "xMidYMid"
                },
                true,
                "education",
                this.newOuterPath!
            )
            
            return container
        }

        return null
    }

    // Haalt het HTML-element op basis van de ID
    public getHTMLTagElement(): HTMLElement | null
    {
        const SVGElement = document.getElementById(this.HTMLID)
        return SVGElement
    }

    // Verandert de Y-waarden van een pad op basis van de berekende viewBox-subtractie
    public changeValueY(path: string): string | null
    {
        const getPathParts = DeconstructPath.getPathParts(path)
        const SVGInitChangedY = DeconstructPath.changeY(getPathParts, this.calcViewboxSubstraction())

        return SVGInitChangedY
    }

    // Pas een hardcoded offset toe op het inner path (tijdelijke fix)
    public hardcodedOffset(): string
    {
        const newPath = CreateSides.getEachSide(this.newInnerPath!)
        const createInnerPath = CreateSides.mutateOffsetPath(newPath!, this.BORDER_INNER_PADDING)
        createInnerPath.innerTop[0].x = createInnerPath.innerTop[0].x + this.BORDER_INNER_PADDING // FIX!: Niet correcte manier
        createInnerPath.innerTop[1].x = createInnerPath.innerTop[1].x - this.BORDER_INNER_PADDING // FIX!: Niet correcte manier
        const mergedArray = CreateSides.mergePathArray(createInnerPath)
        const pathToString = DeconstructPath.createNewSVGPathString(mergedArray)

        return pathToString
    }
}
