# Visie

Het oorspronkelijke idee was om alle losse SVG-elementen een relatie te laten hebben met de root SVG. Vandaar de inheritance in de **core/** files. 

Of dit daadwerkelijk het geval is geworden, weet ik niet. Zal dit verder uitzoeken. Vanaf de class **SVGFactory** ben ik dit een beetje uit het oog verloren...

---

# Start

1. Zorg dat je in de root zit. Je mag ook in de **main/** folder zitten.

2. Start een Python HTTP server:
    ```bash
    python3 -m http.server
    ```

3. Vergeet niet TypeScript te starten. Zorg wel dat je in de **main.** folder zit:
    ```bash
    npx tsc -w
    ```

4. Ga naar de localhost:

- [0.0.0.0:8000](http://0.0.0.0:8000)

5. Open de **main/main.html**.

In de **main/** folder staat de code voor de SVG.

---

## Mappenstructuur

**svg/**  
Hoofdmap waarin alle code staat die te maken heeft met het opbouwen, berekenen en renderen van SVG-structuren.

**svg/components/**  
Bevat alle herbruikbare SVG-logica: core, berekeningen en path-manipulatie.

> NOTE: Structuur en naamgeving zijn functioneel maar niet optimaal.

**svg/components/core/**  
Kernlaag voor SVG-creatie en DOM-interactie.  
Hier worden SVG-root elementen aangemaakt en worden alle child-elementen correct aan de DOM gekoppeld.

**svg/components/calculations/**  
Pure berekeningslogica zonder DOM- of SVG-kennis.  
Classes bevatten uitsluitend wiskundige of geometrische berekeningen (input → output).

**svg/education/**  
Code specifiek voor de education-sectie in de HTML.  
Bevat initialisatie en sectie-specifieke SVG-eigenschappen.

**svg/languages/**  
Code specifiek voor de language-sectie in de HTML.  
Hier wordt de SVG-logica toegepast op kleinere, herhaalbare containers.

**svg/types/**  
Centrale definitie van TypeScript types en interfaces.

---

## Architectuur – Globale Flow

1. **SVG / CreateSVG** initialiseert en configureert het root SVG-element.
2. **SVGFactory** maakt individuele SVG-elementen aan en koppelt ze aan de juiste parent.
3. **MainBorder** maakt een contrast van het gegeven `<path>`.
4. **InitPath** start de opbouw van de borderstructuur op basis van een `<path>`.
5. **CreateSides** deelt het path op in zijdes (Top, Right, Bottom, Left).
6. **DeconstructPath** zet `<path>` data om naar numerieke punten.
7. **InnerPath** genereert aangepaste varianten van het path (offsets).
8. **PathFigures** combineert inner + outer paden tot losse border-segmenten.
9. De resulterende figuren worden via core-classes als SVG-elementen gerenderd.

---

## Core Classes

 >NOTE: MainBorder class is beetje gekke class. Moet aangepast worden. Wss zelfs verwijderen!
**MainBorder**
Het idee was om een contrast te schetsen voor de border. 
Maar waarschijnlijk heeft de code al genoeg aan het <path> als contour.

**SVG**  
Basisklasse voor alle SVG-interactie met de DOM.  
Beheert:
- SVG namespace
- HTML-koppeling via ID
- Attributen zoals viewBox
- Optionele standaard styling

Deze class bevat geen logica voor child-elementen.

**CreateSVG**  
Uitbreiding van `SVG`.  
Verantwoordelijk voor:
- Initialiseren van het root `<svg>` element
- Beheren van parents (`<svg>`, `<g>`, `<defs>`)
- Beschikbaar stellen van context voor child-elementen

**SVGFactory**  
Fabrieksklasse voor het aanmaken van SVG-child-elementen.  
Bepaalt:
- Welk SVG-element wordt gemaakt
- Welke attributes worden toegepast
- Aan welke parent het element wordt toegevoegd

---

## Calculation Classes

**CalcPathProperties**  
Bevat berekeningen die uitsluitend betrekking hebben op `<path>` elementen.  
Voorbeelden:
- Lengtes
- Segmentafstanden
- Puntinterpolaties

Geen DOM- of SVG-creatie.

**CalcCircleProperties**  
Bevat berekeningen voor `<circle>` elementen.  
Voorbeelden:
- Radius
- Omtrek
- Middelpunt-afleidingen

---

## Other Classes

**InitPath**  
Orkestreert de opbouw van een SVG-border op basis van een `<path>`.  
Verantwoordelijk voor:
- Starten van path-analyse
- Aanroepen van side-, inner- en figure-logica
- Doorgeven van data aan rendering-lagen

Maakt zelf geen SVG-elementen aan.

---

**CreateSides**  
De code om van een `<path>` element alle punten in te delen in vier zijdes:
Top, Right, Bottom en Left.

Wordt gebruikt om directionele logica mogelijk te maken bij borders.

> NOTE: Gericht op rechthoekige / polygon-achtige vormen.  
> Andere vormen vereisen een aparte implementatie.

---

**DeconstructPath**  
Zet een SVG `<path>` string om naar een array van `{ x, y }` punten en kan deze weer samenvoegen tot een nieuwe `<path>` string.

Wordt gebruikt om paden numeriek te manipuleren, zoals:
- schalen
- verschuiven
- offsets toepassen

> NOTE: Ondersteunt alleen `M` en `L` commando’s.  
> Geen curves (`C`, `Q`, `A`).

---

**InnerPath**  
Genereert een aangepaste versie van een bestaand `<path>`.  
Wordt voornamelijk gebruikt voor:
- inner offsets
- outer offsets
- parallelle paden

Werkt per zijde en bouwt daarna het volledige pad opnieuw op.

> NOTE: Gaat uit van NIET gesloten polygonen (`Z`) zonder curves.

---

**PathFigures**  
Combineert een outer `<path>` en een inner `<path>` tot losse border-segmenten (figuren).

Elke figuur:
- bestaat uit vier punten
- vertegenwoordigt één stuk van de border
- kan afzonderlijk gerenderd en gestyled worden

Deze class bevat geen DOM-logica en levert alleen geometrische data.

> NOTE: Ontworpen voor 2 aanwezig borders.
