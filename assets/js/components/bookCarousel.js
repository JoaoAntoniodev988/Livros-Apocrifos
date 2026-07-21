const bookCarouselComponent = {

    init(livros) {

        this.livros = livros;
        this.trackEl = document.getElementById("booksTrack");

        if (!livros.length) {
            this.trackEl.innerHTML = `<p class="books-empty">Sem livros disponíveis.</p>`;
            return;
        }

        this.trackEl.innerHTML = livros
            .map(livro => cardLivroComponent.criarHTML(livro, { linkBase: "paginas/" }))
            .join("");

        this.slider = createSlider({
            trackSelector: "#booksTrack",
            dotsSelector: "#booksDots",
            prevSelector: "#booksPrev",
            nextSelector: "#booksNext",
            autoplayMs: appConfig.autoplayIntervalo
        });

        this.slider.setTotal(livros.length);

    }

};