/**
 * CalcResizeContainer
 * 
 * Meet en bewaart de breedte en hoogte van een HTML-element en past deze aan bij window-resize events.
 */
export class CalcResizeContainer
{
    // Houdt een referentie bij naar het doel-HTML-element en slaat de huidige afmetingen op
    private content: HTMLElement | null
    private contentWidth: number
    private contentHeight: number

    // Initialiseert de container door een element te selecteren via CSS-selector
    // en leest direct de initiële breedte en hoogte uit
    constructor(contentSelector: string)
    {
        const getElement = document.querySelector(`${contentSelector}`)

        if (!getElement)
            throw new Error(`Element not found: ${contentSelector}`)

        this.content = getElement as HTMLElement
        this.contentWidth = this.content!.getBoundingClientRect().width
        this.contentHeight = this.content!.getBoundingClientRect().height
    }

    // Luistert naar window resize events en update de breedte en hoogte dynamisch
    public getContentSize(): void
    {   
        window.addEventListener("resize", () => {
            this.contentWidth = this.content!.getBoundingClientRect().width
            this.contentHeight = this.content!.getBoundingClientRect().height
        })
    }   
 
    // Geeft de huidige hoogte van het element terug
    public get getContentHeight() : number 
    {
        return this.contentHeight 
    }
}
