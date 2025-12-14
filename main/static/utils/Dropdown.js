export class Dropdown {
    constructor() {
        this.dropdownMenuHTML = document.querySelector(".nav-header-dropdown");
        this.toggleButtonDropdownHTML = document.querySelector(".nav-toggle-button");
        this.headerHTML = document.querySelector("header");
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }
    toggleDropdown() {
        if (this.dropdownMenuHTML && this.headerHTML && this.toggleButtonDropdownHTML) {
            const isOpen = this.dropdownMenuHTML.style.display === "block";
            this.dropdownMenuHTML.style.display = isOpen ? "none" : "block";
            if (isOpen) {
                this.headerHTML.classList.remove("dropdown-active");
            }
            else {
                this.headerHTML.classList.add("dropdown-active");
            }
        }
    }
    checkForButton() {
        if (this.toggleButtonDropdownHTML) {
            this.toggleButtonDropdownHTML.addEventListener("click", this.toggleDropdown);
        }
    }
}
