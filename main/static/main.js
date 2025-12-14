import { callAllInstances } from "./svg/profilePicSVG.js";
import { exportClass } from "./svg/languages/languageInit.js";
import { educationInit } from "./svg/education/educationInit.js";
// Wacht tot DOM geladen is voor interacties en SVG-elementen
document.addEventListener("DOMContentLoaded", () => {
    // Bouw en render education SVG-secties
    educationInit(); // Moet hier staan omdat de SVG afhankelijk is van de hoogte van de ingeladen HTML
});
// Initialiseer profiel SVG's
callAllInstances();
// Exporteer taal-specifieke SVG's
exportClass();
