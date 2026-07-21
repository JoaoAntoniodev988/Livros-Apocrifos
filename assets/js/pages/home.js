let infoSlides = [];
let infoIndex = 0;

let livrosDestaque = [];
let bookIndex = 0;

document.addEventListener("DOMContentLoaded", async () => {

    // Carrossel informativo
    try {
        const response = await fetch("assets/dados/sobre-apocrifos.json");
        const dados = await response.json();
        infoSlides = dados.slides || [];
        renderInfoSlide();
        renderInfoDots();
    } catch (erro) {
        console.error("Erro ao carregar sobre-apocrifos.json:", erro);
    }

    document.getElementById("infoPrev").addEventListener("click", () => mudarInfoSlide(-1));
    document.getElementById("infoNext").addEventListener("click", () => mudarInfoSlide(1));

    // Carrossel de livros em destaque
    livrosDestaque = await livrosService.carregar();
    renderBooksTrack();

    document.getElementById("booksPrev").addEventListener("click", () => mudarBookIndex(-1));
    document.getElementById("booksNext").addEventListener("click", () => mudarBookIndex(1));

});

function renderInfoSlide() {

    if (!infoSlides.length) return;

    const slide = infoSlides[infoIndex];

    document.getElementById("infoSlideTitulo").textContent = slide.titulo;
    document.getElementById("infoSlideConteudo").innerHTML = slide.paragrafos
        .map(p => `<p>${escapeHTML(p)}</p>`)
        .join("");

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
        });
    });

}

function atualizarInfoDots() {
    document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === infoIndex);
    });
}

function mudarInfoSlide(direcao) {
    const total = infoSlides.length;
    infoIndex = (infoIndex + direcao + total) % total;
    renderInfoSlide();
    atualizarInfoDots();
}

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

function mudarBookIndex(direcao) {
    const total = livrosDestaque.length;
    bookIndex = (bookIndex + direcao + total) % total;
    atualizarBooksTrackPosicao();
}

function atualizarBooksTrackPosicao() {
    const track = document.getElementById("booksTrack");
    track.style.transform = `translateX(-${bookIndex * 100}%)`;
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