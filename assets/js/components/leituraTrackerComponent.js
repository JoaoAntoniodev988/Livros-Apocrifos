const leituraTrackerComponent = {

    observer: null,
    paragrafoAtual: 0,

    iniciar(onMudarParagrafo) {

        this.parar();

        const paragrafos = document.querySelectorAll("#readingText p[data-p-index]");
        if (!paragrafos.length) return;

        this.observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const index = parseInt(entry.target.dataset.pIndex, 10);
                this.paragrafoAtual = index;
                onMudarParagrafo(index);
            });

        }, { rootMargin: "-35% 0px -55% 0px" }); // considera "lido" o parágrafo perto do centro do ecrã

        paragrafos.forEach(p => this.observer.observe(p));

    },

    parar() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        this.paragrafoAtual = 0;
    }

};