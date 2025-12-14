# Specific FIXES

InnerPath:

    - mutateOffsetPath() -> (if (sides.top)), (if (sides.right)), ...
        Alle if-statements voor de 4 sides moet veel efficienter gemaakt worden.

educationInit.ts:

    - MAIN_PATH --- INNER_CONTENT_PATH
        De strokeWidth van het pad moet meegenomen worden in de berekening van de viewbox. Nu zijn de buitenste randen afgesneden. Zet viewbox 1-2 punten lager en het is opgelost, maar niet juiste manier.

CreateEducation:

    - hardcodedOffset() -> .innerTop[0-1].x + this.BORDER_INNER_PADDING
        Punten willen niet correcte padding pakken.

languageInit.ts:

    - viewboxWidth - viewboxHeight
        Gehele viewbox klopt niet. Zelfde verhaal als bij educationInit.ts

CalcResizeContainer

    - De constructor heeft code wat de DOM manipuleert. Dat mag niet, want op elk andere pagina waar de selector niet op gevonden kan worden komt een error.

attributes.ts

    - Moeten meer SVGAttributes bij komen. Nog niet elke SVG element heeft namelijk zijn eigen type.


## Algemene FIXES

- Overal uitroepenteken (!) en vraagteken (?) wegwerken.

- Overal waar "return null" staat moeten betere Errors -> console.error("Error") -> throw new Error("..."). Mischien de null vervangen voor de return type van de class. Dus: i.p.v. **return null** beter **return 0** of **return ""**. 
> NOTE: Let wel op dat **null** wordt gezien als incorrecte data. en bijv. **return 0** wordt gezien als wel correct format, maar geen items gevonden/meegegeven.

- Types/interfaces moeten verbeterd worden. Als er **Array, Object, Record** staat, kan die wss vervangen worden door een custom Type! 