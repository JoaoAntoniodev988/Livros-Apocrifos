class Slider {

    constructor(selector) {

        this.container = document.querySelector(selector);

        if (!this.container) return;

        this.slider = this.container.querySelector(".books-slider");
        this.track = this.container.querySelector(".books-track");

        this.cards = [...this.track.children];

        this.prev = this.container.querySelector(".slider-prev");
        this.next = this.container.querySelector(".slider-next");

        this.index = 0;

        this.visibleCards = 1;

        this.cardWidth = 0;

        this.calculate();

        this.events();

        this.update();

    }

    calculate() {

        if (!this.cards.length) return;

        if (window.innerWidth >= 1200) {

            this.visibleCards = 3;

        } else if (window.innerWidth >= 768) {

            this.visibleCards = 2;

        } else {

            this.visibleCards = 1;

        }

        this.cardWidth = this.slider.clientWidth / this.visibleCards;

        this.cards.forEach(card => {

            card.style.minWidth = `${this.cardWidth}px`;

        });

    }

    events() {

        this.next.addEventListener("click", () => {

            if (this.index < this.cards.length - this.visibleCards) {

                this.index++;

                this.update();

            }

        });

        this.prev.addEventListener("click", () => {

            if (this.index > 0) {

                this.index--;

                this.update();

            }

        });

        window.addEventListener("resize", () => {

            this.calculate();

            this.update();

        });

    }

    update() {

        this.track.style.transform =
            `translateX(-${this.index * this.cardWidth}px)`;

    }

}

document.addEventListener("DOMContentLoaded", () => {

    new Slider(".featured-books");

});