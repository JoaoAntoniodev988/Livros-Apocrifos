const fraseJesusComponent = {

    frase: null,

    init() {

        document.getElementById("btnPartilharFraseJesus").addEventListener("click", () => {
            personalizarSheetComponent.abrir(this.frase);
        });

        document.getElementById("btnNotaFraseJesus").addEventListener("click", () => {
            notaModalComponent.abrir(this.frase);
        });

    },

    render(frase) {

        this.frase = frase;

        document.getElementById("fraseJesusSection").hidden = false;
        // document.getElementById("fraseJesusFonte").textContent = frase.livroTitulo;
        document.getElementById("fraseJesusTexto").textContent = frase.texto;

    }

};