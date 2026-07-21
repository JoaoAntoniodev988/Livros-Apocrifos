const infoCarouselComponent = {

    async init(slides) {

        this.slides = slides;
        this.tituloEl = document.getElementById("infoSlideTitulo");
        this.conteudoEl = document.getElementById("infoSlideConteudo");
        this.wrapperEl = document.getElementById("infoSlideConteudoWrapper");
        this.cardEl = document.querySelector(".info-carousel__card");
        this.toggleEl = document.getElementById("infoToggle");

        this.toggleEl.addEventListener("click", () => this.alternarExpandir());

        this.slider = createSlider({
            trackSelector: null,
            dotsSelector: "#infoDots",
            prevSelector: "#infoPrev",
            nextSelector: "#infoNext",
            autoplayMs: appConfig.autoplayIntervalo,
            onIndexChange: (index) => this.renderSlide(index)
        });

        this.slider.setTotal(slides.length);

    },

    renderSlide(index) {

        const slide = this.slides[index];
        if (!slide) return;

        this.tituloEl.textContent = slide.titulo;
        this.conteudoEl.innerHTML = slide.paragrafos
            .map(p => `<p>${domUtils.escapeHTML(p)}</p>`)
            .join("");

        this.fechar();

    },

    alternarExpandir() {

        const expandido = this.wrapperEl.classList.toggle("is-expanded");
        this.cardEl.classList.toggle("is-expanded", expandido);
        this.toggleEl.textContent = expandido ? "Ler menos" : "Ler mais";

        if (expandido) {
            this.slider.pararAutoplay();
        } else {
            this.slider.iniciarAutoplay();
        }

    },

    fechar() {
        this.wrapperEl.classList.remove("is-expanded");
        this.cardEl.classList.remove("is-expanded");
        this.toggleEl.textContent = "Ler mais";
    }

};