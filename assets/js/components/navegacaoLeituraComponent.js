const navegacaoLeituraComponent = {

    init({ onAnterior, onProxima }) {

        this.onAnterior = onAnterior;
        this.onProxima = onProxima;

        document.getElementById("btnAnterior").addEventListener("click", () => this.onAnterior());
        document.getElementById("btnProxima").addEventListener("click", () => this.onProxima());

        document.getElementById("btnToggleToc").addEventListener("click", () => {
            document.getElementById("readingToc").classList.toggle("is-open");
        });

        document.addEventListener("keydown", (evento) => {

            const tag = document.activeElement.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA") return;

            if (evento.key === "ArrowRight") this.onProxima();
            if (evento.key === "ArrowLeft") this.onAnterior();

        });

    },

    atualizarBotoes(indexAtual, total) {
        document.getElementById("btnAnterior").disabled = indexAtual === 0;
        document.getElementById("btnProxima").disabled = indexAtual === total - 1;
    },

    scrollParaTopoDoTexto() {
        document.getElementById("chapterTitle").scrollIntoView({ behavior: "smooth", block: "start" });
    }

};