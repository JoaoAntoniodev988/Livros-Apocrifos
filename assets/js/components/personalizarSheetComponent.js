const personalizarSheetComponent = {

    formatoAtual: "quadrado",

    init() {

        document.getElementById("personalizarBackdrop").addEventListener("click", () => this.fechar());

        document.querySelectorAll(".personalizar-sheet__tabs button").forEach(btn => {
            btn.addEventListener("click", () => this._selecionarFormato(btn.dataset.formato));
        });

        document.getElementById("btnPersonalizar").addEventListener("click", () => this.fechar());
        document.getElementById("btnPartilharPersonalizado").addEventListener("click", () => this._partilhar());

    },

    abrir(frase) {

        this.frase = frase;
        document.getElementById("personalizarTexto").textContent = frase.texto;
        document.getElementById("personalizarSheet").hidden = false;

    },

    fechar() {
        document.getElementById("personalizarSheet").hidden = true;
    },

    _selecionarFormato(formato) {

        this.formatoAtual = formato;

        document.querySelectorAll(".personalizar-sheet__tabs button").forEach(btn => {
            btn.classList.toggle("is-active", btn.dataset.formato === formato);
        });

        const preview = document.getElementById("personalizarPreview");
        preview.classList.remove("is-quadrado", "is-vertical", "is-texto");
        preview.classList.add(`is-${formato}`);

    },

    _partilhar() {

        const texto = `"${this.frase.texto}" — ${this.frase.livroTitulo}`;

        if (navigator.share) {
            navigator.share({ text: texto }).catch(() => {});
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(texto);
            alert("Frase copiada para a área de transferência.");
        }

        this.fechar();

    }

};