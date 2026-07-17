class Slider {

    constructor(selector) {

        this.container = document.querySelector(selector);

        if (!this.container) return;

        this.track = this.container.querySelector(".books-track");

        this.prev = this.container.querySelector(".slider-prev");

        this.next = this.container.querySelector(".slider-next");

        this.index = 0;

        this.maxIndex = 0;

        this.init();

    }

    init() {

        this.updateSizes();

        this.events();

        this.update();

    }

    getCardWidth() {

        const card = this.track.querySelector(".book-card");

        if (!card) return 0;

        const gap = parseFloat(
            getComputedStyle(this.track).gap
        ) || 0;

        return card.offsetWidth + gap;

    }

    updateSizes() {

        const cards = this.track.querySelectorAll(".book-card");

        if (!cards.length) return;

        const slider = this.container.querySelector(".books-slider");

        const cardWidth = this.getCardWidth();

        const visibleCards = Math.max(
            1,
            Math.floor(slider.offsetWidth / cardWidth)
        );

        this.maxIndex = Math.max(
            0,
            cards.length - visibleCards
        );

        if (this.index > this.maxIndex) {

            this.index = this.maxIndex;

        }

    }

    events() {

        this.next?.addEventListener("click", () => {

            if (this.index < this.maxIndex) {

                this.index++;

                this.update();

            }

        });

        this.prev?.addEventListener("click", () => {

            if (this.index > 0) {

                this.index--;

                this.update();

            }

        });

        window.addEventListener("resize", () => {

            this.updateSizes();

            this.update();

        });

    }

    update() {

        const largura = this.getCardWidth();

        this.track.style.transform =
            `translateX(-${this.index * largura}px)`;

    }

}