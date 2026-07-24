function createSlider({ trackSelector, dotsSelector, prevSelector, nextSelector, autoplayMs, onIndexChange }) {

    let index = 0;
    let total = 0;
    let timer = null;

    const trackEl = trackSelector ? document.querySelector(trackSelector) : null;
    const dotsEl = dotsSelector ? document.querySelector(dotsSelector) : null;
    const prevEl = prevSelector ? document.querySelector(prevSelector) : null;
    const nextEl = nextSelector ? document.querySelector(nextSelector) : null;

    function renderDots() {
        if (!dotsEl) return;
        dotsEl.innerHTML = Array.from({ length: total }, (_, i) => `
            <button class="carousel-dot ${i === index ? "is-active" : ""}" data-index="${i}"></button>
        `).join("");

        dotsEl.querySelectorAll(".carousel-dot").forEach(dot => {
            dot.addEventListener("click", () => goTo(parseInt(dot.dataset.index, 10)));
        });
    }

    function atualizarDots() {
        if (!dotsEl) return;
        dotsEl.querySelectorAll(".carousel-dot").forEach((dot, i) => {
            dot.classList.toggle("is-active", i === index);
        });
    }

    function aplicar() {
        if (trackEl) trackEl.style.transform = `translateX(-${index * 100}%)`;
        atualizarDots();
        if (onIndexChange) onIndexChange(index);
    }

    function goTo(novoIndex) {
        if (total === 0) return;
        index = ((novoIndex % total) + total) % total;
        aplicar();
        reiniciarAutoplay();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function iniciarAutoplay() {
        pararAutoplay();
        if (total <= 1 || !autoplayMs) return;
        timer = setInterval(next, autoplayMs);
    }

    function pararAutoplay() {
        if (timer) clearInterval(timer);
    }

    function reiniciarAutoplay() {
        iniciarAutoplay();
    }

    function ativarGestoDeslizar() {

        const elemento = trackEl || (prevEl ? prevEl.parentElement : null);
        if (!elemento) return;

        touchGestures.aoDeslizar(elemento, {
            onSwipeLeft: next,
            onSwipeRight: prev
        });

    }

    if (prevEl) prevEl.addEventListener("click", prev);
    if (nextEl) nextEl.addEventListener("click", next);

    ativarGestoDeslizar();

    return {
        setTotal(novoTotal) {
            total = novoTotal;
            index = 0;
            renderDots();
            aplicar();
            iniciarAutoplay();
        },
        goTo,
        next,
        prev,
        iniciarAutoplay,
        pararAutoplay
    };

}