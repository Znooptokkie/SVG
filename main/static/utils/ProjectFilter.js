export class CustomSelect {
    constructor(select) {
        this.select = select;
        this.selected = select.querySelector(".selected");
        this.options = select.querySelectorAll(".options li");
        this.defaultText = this.selected.textContent?.trim() || "";
        this.init();
    }
    static applyFilters(filterType, filterValue) {
        if (filterValue)
            CustomSelect.activeFilters[filterType] = filterValue;
        else
            delete CustomSelect.activeFilters[filterType];
        const projects = document.querySelectorAll(".progress-child-container");
        projects.forEach(project => {
            const tags = (project.dataset.tags || "").split(",").map(t => t.trim().toLowerCase());
            const visible = Object.entries(CustomSelect.activeFilters).every(([type, value]) => {
                if (type === "language" || type === "framework") {
                    return tags.includes(value.toLowerCase());
                }
                return project.dataset[type] === value;
            });
            project.style.display = visible ? "" : "none";
        });
        CustomSelect.updateDividers();
    }
    static updateDividers() {
        document.querySelectorAll(".project-divider").forEach(el => el.remove());
        const visibleProjects = Array.from(document.querySelectorAll(".progress-child-container")).filter(p => p.style.display !== "none");
        for (let i = 0; i < visibleProjects.length - 1; i++) {
            const hr = document.createElement("hr");
            hr.className = "project-divider";
            visibleProjects[i].insertAdjacentElement("afterend", hr);
        }
    }
    init() {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            this.select.addEventListener("click", (e) => {
                e.stopPropagation();
                this.toggleOpen();
            });
        }
        this.options.forEach(option => option.addEventListener("click", (e) => {
            e.stopPropagation();
            this.selectOption(option);
        }));
    }
    selectOption(option) {
        const filterType = this.select.dataset.filter;
        const filterValue = option.dataset.value || "";
        this.options.forEach(o => o.classList.remove("active"));
        option.classList.add("active");
        if (window.innerWidth > 768) {
            this.selected.textContent = option.textContent;
            this.select.classList.remove("open");
        }
        CustomSelect.applyFilters(filterType, filterValue);
    }
    toggleOpen() {
        this.select.classList.toggle("open");
    }
    reset() {
        this.selected.textContent = this.defaultText;
        this.options.forEach(o => o.classList.remove("active"));
    }
    static initAll() {
        const selects = Array.from(document.querySelectorAll(".custom-select"))
            .map(select => new CustomSelect(select));
        const mobileFilterHeader = document.querySelector(".mobile-filter-header");
        const mobileFilter = document.querySelector(".mobile-filter");
        if (mobileFilterHeader && mobileFilter) {
            mobileFilterHeader.addEventListener("click", () => {
                mobileFilter.classList.toggle("open");
            });
        }
        document.addEventListener("click", (e) => {
            document.querySelectorAll(".custom-select.open").forEach(select => {
                if (!(e.target instanceof Node && select.contains(e.target))) {
                    select.classList.remove("open");
                }
            });
        });
        // resetknop
        const resetButton = document.querySelector(".reset-filters");
        const searchInput = document.querySelector(".filter-search");
        if (resetButton) {
            resetButton.addEventListener("click", () => {
                CustomSelect.activeFilters = {};
                if (searchInput)
                    searchInput.value = "";
                const projects = document.querySelectorAll(".progress-child-container");
                projects.forEach(project => project.style.display = "");
                CustomSelect.updateDividers();
                selects.forEach(s => s.reset());
            });
        }
        // tekstzoekveld
        if (searchInput) {
            searchInput.addEventListener("input", () => {
                const query = searchInput.value.trim().toLowerCase();
                const projects = document.querySelectorAll(".progress-child-container");
                projects.forEach(project => {
                    const title = project.querySelector("h3")?.textContent?.toLowerCase() || "";
                    const excerpt = project.querySelector("p")?.textContent?.toLowerCase() || "";
                    const passesFilters = Object.entries(CustomSelect.activeFilters).every(([type, value]) => {
                        const tags = (project.dataset.tags || "").split(",").map(t => t.trim().toLowerCase());
                        if (type === "language" || type === "framework") {
                            return tags.includes(value.toLowerCase());
                        }
                        return project.dataset[type] === value;
                    });
                    const matchesText = title.includes(query) || excerpt.includes(query);
                    project.style.display = passesFilters && matchesText ? "" : "none";
                });
                CustomSelect.updateDividers();
            });
        }
    }
}
CustomSelect.activeFilters = {};
