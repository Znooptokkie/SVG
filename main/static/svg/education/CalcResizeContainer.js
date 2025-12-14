/**
 * CalcResizeContainer
 *
 * Meet en bewaart de breedte en hoogte van een HTML-element en past deze aan bij window-resize events.
 */
export class CalcResizeContainer {
    // Initialiseert de container door een element te selecteren via CSS-selector
    // en leest direct de initiële breedte en hoogte uit
    constructor(contentSelector) {
        const getElement = document.querySelector(`${contentSelector}`);
        if (!getElement)
            throw new Error(`Element not found: ${contentSelector}`);
        this.content = getElement;
        this.contentWidth = this.content.getBoundingClientRect().width;
        this.contentHeight = this.content.getBoundingClientRect().height;
    }
    // Luistert naar window resize events en update de breedte en hoogte dynamisch
    getContentSize() {
        window.addEventListener("resize", () => {
            this.contentWidth = this.content.getBoundingClientRect().width;
            this.contentHeight = this.content.getBoundingClientRect().height;
        });
    }
    // Geeft de huidige hoogte van het element terug
    get getContentHeight() {
        return this.contentHeight;
    }
}
