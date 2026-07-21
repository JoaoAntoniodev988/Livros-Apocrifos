let infoSlides = [];
let infoIndex = 0;
let infoAutoplay = null;

let livrosDestaque = [];
let bookIndex = 0;
let booksAutoplay = null;

const AUTOPLAY_INTERVALO = 9000;

document.addEventListener("DOMContentLoaded", async () => {

    // Carrossel informativo
    try {
        const response = await fetch("assets/dados/sobre-apocrifos.json");
        const dados = await response.json();
        infoSlides = dados.slides || [];
        renderInfoSlide();
        renderInfoDots();
        iniciarInfoAutoplay();
    } catch (erro) {
        console.error("Erro ao carregar sobre-apocrifos.json:", erro);
    }

    document.getElementById("infoPrev").addEventListener("click", () => {
        mudarInfoSlide(-1);
        reiniciarInfoAutoplay();
    });

    document.getElementById("infoNext").addEventListener("click", () => {
        mudarInfoSlide(1);
        reiniciarInfoAutoplay();
    });

    document.getElementById("infoToggle").addEventListener("click", () => {

        const card = document.querySelector(".info-carousel__card");
        const wrapper = document.getElementById("infoSlideConteudoWrapper");
        const toggle = document.getElementById("infoToggle");

        const expandido = wrapper.classList.toggle("is-expanded");
        card.classList.toggle("is-expanded", expandido);
        toggle.textContent = expandido ? "Ler menos" : "Ler mais";

        // Enquanto o texto estiver expandido, pausa o avanço automático
        if (expandido) {
            pararInfoAutoplay();
        } else {
            iniciarInfoAutoplay();
        }

    });

    // Carrossel de livros em destaque
    livrosDestaque = await livrosService.carregar();
    renderBooksTrack();
    renderBooksDots();
    iniciarBooksAutoplay();

    document.getElementById("booksPrev").addEventListener("click", () => {
        mudarBookIndex(-1);
        reiniciarBooksAutoplay();
    });

    document.getElementById("booksNext").addEventListener("click", () => {
        mudarBookIndex(1);
        reiniciarBooksAutoplay();
    });

});

/* ---------- Carrossel Informativo ---------- */

function renderInfoSlide() {

    if (!infoSlides.length) return;

    const slide = infoSlides[infoIndex];

    document.getElementById("infoSlideTitulo").textContent = slide.titulo;
    document.getElementById("infoSlideConteudo").innerHTML = slide.paragrafos
        .map(p => `<p>${escapeHTML(p)}</p>`)
        .join("");

    fecharInfoCard();

}

function fecharInfoCard() {

    const card = document.querySelector(".info-carousel__card");
    const wrapper = document.getElementById("infoSlideConteudoWrapper");
    const toggle = document.getElementById("infoToggle");

    card.classList.remove("is-expanded");
    wrapper.classList.remove("is-expanded");
    toggle.textContent = "Ler mais";

}

function renderInfoDots() {

    const container = document.getElementById("infoDots");

    container.innerHTML = infoSlides.map((_, i) => `
        <button class="carousel-dot ${i === infoIndex ? "is-active" : ""}" data-index="${i}"></button>
    `).join("");

    container.querySelectorAll(".carousel-dot").forEach(dot => {
        dot.addEventListener("click", () => {
            infoIndex = parseInt(dot.dataset.index, 10);
            renderInfoSlide();
            atualizarInfoDots();
            reiniciarInfoAutoplay();
        });
    });

}

function atualizarInfoDots() {
    document.querySelectorAll("#infoDots .carousel-dot").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === infoIndex);
    });
}

function mudarInfoSlide(direcao) {
    const total = infoSlides.length;
    infoIndex = (infoIndex + direcao + total) % total;
    renderInfoSlide();
    atualizarInfoDots();
}

function iniciarInfoAutoplay() {
    pararInfoAutoplay();
    if (infoSlides.length <= 1) return;
    infoAutoplay = setInterval(() => mudarInfoSlide(1), AUTOPLAY_INTERVALO);
}

function pararInfoAutoplay() {
    if (infoAutoplay) clearInterval(infoAutoplay);
}

function reiniciarInfoAutoplay() {
    iniciarInfoAutoplay();
}

/* ---------- Carrossel de Livros ---------- */

function renderBooksTrack() {

    const track = document.getElementById("booksTrack");

    if (!livrosDestaque.length) {
        track.innerHTML = `<p class="books-empty">Sem livros disponíveis.</p>`;
        return;
    }

    track.innerHTML = livrosDestaque.map(livro => criarBookCard(livro)).join("");
    atualizarBooksTrackPosicao();

}

function criarBookCard(livro) {

    const categoria = livro.categoria?.principal || "";
    const descricao = livro.descricao?.curta || "";

    return `
        <a href="paginas/leitura.html?id=${encodeURIComponent(livro.id)}" class="book-card">
            <span class="book-card__categoria">${escapeHTML(categoria)}</span>
            <h3 class="book-card__titulo">${escapeHTML(livro.titulo)}</h3>
            <p class="book-card__descricao">${escapeHTML(descricao)}</p>
        </a>
    `;

}

function renderBooksDots() {

    const container = document.getElementById("booksDots");

    container.innerHTML = livrosDestaque.map((_, i) => `
        <button class="carousel-dot ${i === bookIndex ? "is-active" : ""}" data-index="${i}"></button>
    `).join("");

    container.querySelectorAll(".carousel-dot").forEach(dot => {
        dot.addEventListener("click", () => {
            bookIndex = parseInt(dot.dataset.index, 10);
            atualizarBooksTrackPosicao();
            atualizarBooksDots();
            reiniciarBooksAutoplay();
        });
    });

}

function atualizarBooksDots() {
    document.querySelectorAll("#booksDots .carousel-dot").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === bookIndex);
    });
}

function mudarBookIndex(direcao) {
    const total = livrosDestaque.length;
    bookIndex = (bookIndex + direcao + total) % total;
    atualizarBooksTrackPosicao();
    atualizarBooksDots();
}

function atualizarBooksTrackPosicao() {
    const track = document.getElementById("booksTrack");
    track.style.transform = `translateX(-${bookIndex * 100}%)`;
}

function iniciarBooksAutoplay() {
    pararBooksAutoplay();
    if (livrosDestaque.length <= 1) return;
    booksAutoplay = setInterval(() => mudarBookIndex(1), AUTOPLAY_INTERVALO);
}

function pararBooksAutoplay() {
    if (booksAutoplay) clearInterval(booksAutoplay);
}

function reiniciarBooksAutoplay() {
    iniciarBooksAutoplay();
}

function escapeHTML(str) {
    if (typeof str !== "string") return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}