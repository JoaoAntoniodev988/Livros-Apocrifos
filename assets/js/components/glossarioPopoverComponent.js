const glossarioPopoverComponent = {

    init() {

        document.addEventListener("click", (evento) => {

            const termo = evento.target.closest(".glossario-termo");

            document.querySelectorAll(".glossario-popover").forEach(p => p.remove());

            if (!termo) return;

            this._mostrar(termo);
            evento.stopPropagation();

        });

    },

    _mostrar(termoEl) {

        const popover = document.createElement("div");
        popover.className = "glossario-popover";
        popover.innerHTML = `
            <strong>${domUtils.escapeHTML(termoEl.dataset.termo)}</strong>
            <p>${domUtils.escapeHTML(termoEl.dataset.definicao)}</p>
        `;

        termoEl.appendChild(popover);

        const rect = popover.getBoundingClientRect();
        const margem = 16;

        if (rect.right > window.innerWidth - margem) {
            const excesso = rect.right - (window.innerWidth - margem);
            popover.style.left = `-${excesso}px`;
        }

    }

};