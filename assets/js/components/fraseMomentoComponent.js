const fraseMomentoComponent = {

    init(frase) {

        this.frase = frase;

        document.getElementById("fraseMomentoSection").hidden = false;
        document.getElementById("fraseFonte").textContent = frase.livroTitulo;
        document.getElementById("fraseTexto").textContent = frase.texto;

        document.getElementById("btnPartilharFrase").addEventListener("click", () => this._partilhar());
        document.getElementById("btnNotaFrase").addEventListener("click", () => notaModalComponent.abrir(frase));

    },

    _partilhar() {

        const texto = `"${this.frase.texto}" — ${this.frase.livroTitulo}`;

        if (navigator.share) {
            navigator.share({ text: texto }).catch(() => {});
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(texto);
            alert("Frase copiada para a área de transferência.");
        }

    }

};