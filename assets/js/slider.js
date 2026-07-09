class Slider {

    constructor(selector){

        this.container=document.querySelector(selector);

        if(!this.container) return;

        this.track=this.container.querySelector(".books-track");

        this.cards=this.track.children;

        this.prev=document.querySelector(".slider-prev");

        this.next=document.querySelector(".slider-next");

        this.index=0;

        this.cardWidth=340;

        this.events();

    }

    events(){

        this.next.addEventListener("click",()=>{

            if(this.index < this.cards.length-1){

                this.index++;

                this.update();

            }

        });

        this.prev.addEventListener("click",()=>{

            if(this.index>0){

                this.index--;

                this.update();

            }

        });

    }

    update(){

        this.track.style.transform=
        `translateX(-${this.index*this.cardWidth}px)`;

    }

}

document.addEventListener("DOMContentLoaded",()=>{

    new Slider(".featured-books");

});