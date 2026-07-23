const notaModalComponent = {

    init() {
        document.getElementById("btnFecharNota").addEventListener("click", () => this.fechar());
        document.getElementById("btnGuardarNota").addEventListener("click", () => this.guardar());
    },

    abrir(frase) {

        this.fraseAtual = frase;

        document.getElementById("notaModalTitulo").textContent = frase.livroTitulo;
        document.getElementById("notaFraseFonte").textContent = frase.livroTitulo;
        document.getElementById("notaFraseTexto").textContent = frase.texto;
        document.getElementById("notaTexto").value = "";

        document.getElementById("notaModal").hidden = false;

    },

    fechar() {
        document.getElementById("notaModal").hidden = true;
    },

    guardar() {

        const texto = document.getElementById("notaTexto").value.trim();

        if (texto) {
            notasService.adicionar({
                livroId: this.fraseAtual.livroId,
                livroTitulo: this.fraseAtual.livroTitulo,
                frase: this.fraseAtual.texto,
                texto
            });
        }

        this.fechar();

    }

};