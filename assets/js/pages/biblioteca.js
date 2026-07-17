let todosLivros = [];
let filtroAtual = { busca: "", categoria: "Todos" };

document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("booksContainer");
    if (!container) return;

    todosLivros = await livrosService.carregar();

    renderFiltrosCategoria(todosLivros);
    aplicarFiltros();

    // Pesquisa
    const form = document.querySelector(".search-form");
    const input = form.querySelector("input[type='search']");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        filtroAtual.busca = normalizarTexto(input.value.trim());
        aplicarFiltros();
    });

    // Também filtra ao digitar, sem precisar de submeter
    input.addEventListener("input", () => {
        filtroAtual.busca = normalizarTexto(input.value.trim());
        aplicarFiltros();
    });

});

function renderFiltrosCategoria(livros) {

    const container = document.getElementById("categoriaFiltros");
    if (!container) return;

    const categorias = new Set();
    livros.forEach(livro => {
        const cat = extrairCampo(livro.categoria, "principal");
        if (cat) categorias.add(cat);
    });

    const opcoes = ["Todos", ...Array.from(categorias).sort()];

    container.innerHTML = opcoes.map(cat => `
        <button
            class="button-secondary filtro-btn ${cat === "Todos" ? "is-active" : ""}"
            data-categoria="${escapeHTML(cat)}">
            ${escapeHTML(cat)}
        </button>
    `).join("");

    container.querySelectorAll(".filtro-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            container.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("is-active"));
            btn.classList.add("is-active");
            filtroAtual.categoria = btn.dataset.categoria;
            aplicarFiltros();
        });
    });

}

function aplicarFiltros() {

    let resultado = todosLivros;

    if (filtroAtual.categoria !== "Todos") {
        resultado = resultado.filter(livro =>
            extrairCampo(livro.categoria, "principal") === filtroAtual.categoria
        );
    }

    if (filtroAtual.busca) {
        resultado = resultado.filter(livro => {
            const alvo = normalizarTexto([
                livro.titulo,
                livro.subtitulo,
                extrairCampo(livro.descricao, "curta")
            ].join(" "));
            return alvo.includes(filtroAtual.busca);
        });
    }

    renderBooks(resultado);

}

function renderBooks(livros) {

    const container = document.getElementById("booksContainer");
    const countEl = document.getElementById("booksCount");

    container.innerHTML = "";

    if (livros.length === 0) {
        container.innerHTML = `<p class="books-empty">Nenhum livro encontrado.</p>`;
    } else {
        livros.forEach(livro => {
            container.appendChild(criarCard(livro));
        });
    }

    if (countEl) countEl.textContent = livros.length;

}

// Evita injeção de HTML vindo dos dados
function escapeHTML(str) {
    if (typeof str !== "string") return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

// Remove acentos para permitir pesquisa "joao" encontrar "João"
function normalizarTexto(str) {
    if (typeof str !== "string") return "";
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

// Extrai um valor aninhado com fallback, aceitando tanto objeto quanto string solta
function extrairCampo(valor, chave) {
    if (!valor) return "";
    if (typeof valor === "string") return valor;
    if (typeof valor === "object" && valor[chave]) return valor[chave];
    return "";
}

function criarListaTags(itens, className = "book-card-tag") {
    if (!Array.isArray(itens) || itens.length === 0) return "";
    return itens
        .map(item => `<span class="${className}">${escapeHTML(item)}</span>`)
        .join("");
}

function criarListaEstudos(estudos) {
    if (!Array.isArray(estudos) || estudos.length === 0) return "";
    return `
        <ul class="book-card-studies-list">
            ${estudos.map(e => `
                <li>
                    ${escapeHTML(e.autor || "")}, 
                    <em>${escapeHTML(e.titulo || "")}</em>
                    ${e.editora ? ` — ${escapeHTML(e.editora)}` : ""}
                    ${e.ano ? ` (${escapeHTML(String(e.ano))})` : ""}
                </li>
            `).join("")}
        </ul>
    `;
}

function criarCard(livro) {

    const article = document.createElement("article");
    article.className = "book-card";

    const tituloPrincipal = livro.titulo || "";
    const descricaoCurta = extrairCampo(livro.descricao, "curta");
    const categoriaPrincipal = extrairCampo(livro.categoria, "principal");

    const colecao = livro.colecao || {};
    const nomeColecao = colecao.nome || "";
    const codice = colecao.codice || "";
    const localizacaoFisica = colecao.localizacao_fisica || "";
    const anoDescoberta = colecao.ano_descoberta || "";
    const localDescoberta = colecao.local_descoberta || "";

    article.innerHTML = `
        <div class="book-card-body">

            <p>${escapeHTML(categoriaPrincipal)}</p>

            <h3>${escapeHTML(tituloPrincipal)}</h3>

            <p>${escapeHTML(descricaoCurta)}</p>

            <p>
                ${nomeColecao ? `<strong>Coleção:</strong> ${escapeHTML(nomeColecao)}<br>` : ""}
                ${codice ? `<strong>Códice:</strong> ${escapeHTML(codice)}<br>` : ""}
                ${localizacaoFisica ? `<strong>Localização Física:</strong> ${escapeHTML(localizacaoFisica)}<br>` : ""}
                ${anoDescoberta ? `<strong>Ano da Descoberta:</strong> ${escapeHTML(String(anoDescoberta))}<br>` : ""}
                ${localDescoberta ? `<strong>Local da Descoberta:</strong> ${escapeHTML(localDescoberta)}` : ""}
            </p>

            <a href="leitura.html?id=${encodeURIComponent(livro.id)}" class="button-primary">
                Ler Obra
            </a>

        </div>
    `;

    return article;
}