const filtroCategoriaComponent = {

    init(categorias, onSelect) {

        this.container = document.getElementById("categoriaFiltros");
        this.onSelect = onSelect;

        this.container.innerHTML = categorias.map(cat => `
            <button
                class="button-secondary filtro-btn ${cat === "Todos" ? "is-active" : ""}"
                data-categoria="${domUtils.escapeHTML(cat)}">
                ${domUtils.escapeHTML(cat)}
            </button>
        `).join("");

        this.container.querySelectorAll(".filtro-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                this.container.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("is-active"));
                btn.classList.add("is-active");
                this.onSelect(btn.dataset.categoria);
            });
        });

    }

};