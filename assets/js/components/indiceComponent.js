const indiceComponent = {

    init(seccoes, onSelect) {

        this.container = document.getElementById("tocLista");
        this.onSelect = onSelect;

        this.container.innerHTML = seccoes.map((seccao, index) => `
            <button class="reading-toc__item" data-index="${index}">
                ${domUtils.escapeHTML(seccao.titulo)}
            </button>
        `).join("");

        this.container.querySelectorAll(".reading-toc__item").forEach(btn => {
            btn.addEventListener("click", () => {
                this.onSelect(parseInt(btn.dataset.index, 10));
            });
        });

    },

    atualizarAtivo(index) {
        this.container.querySelectorAll(".reading-toc__item").forEach((btn, i) => {
            btn.classList.toggle("is-active", i === index);
        });
    }

};