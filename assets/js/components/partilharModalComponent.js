const partilharModalComponent = {

    init() {

        this.sheet = document.getElementById("personalizarSheet");
        this.backdrop = document.getElementById("personalizarBackdrop");
        this.preview = document.getElementById("personalizarPreview");
        this.texto = document.getElementById("personalizarTexto");

        this.formato = "quadrado";

        this.backdrop.addEventListener("click", () => this.fechar());

        document
            .querySelectorAll(".personalizar-sheet__tabs button")
            .forEach(botao => {

                botao.addEventListener("click", () => {

                    document
                        .querySelectorAll(".personalizar-sheet__tabs button")
                        .forEach(btn => btn.classList.remove("is-active"));

                    botao.classList.add("is-active");

                    this.formato = botao.dataset.formato;

                    this.preview.className =
                        `personalizar-sheet__preview is-${this.formato}`;

                });

            });

        document
            .getElementById("btnPartilharPersonalizado")
            .addEventListener("click", () => this.partilhar());

    },

    abrir(frase) {

        this.frase = frase;

        this.texto.textContent = `"${frase.texto}"`;

        this.sheet.hidden = false;

    },

    fechar() {

        this.sheet.hidden = true;

    },

    partilhar() {

        const texto = `"${this.frase.texto}" — ${this.frase.livroTitulo}`;

        if (navigator.share) {

            navigator.share({
                text: texto
            });

        } else {

            navigator.clipboard.writeText(texto);

        }

        this.fechar();

    }

};