document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("booksContainer");

    if (!container) return;

    const livros = await livrosService.carregar();

    livros.forEach(livro => {
        container.appendChild(criarCard(livro));
    });

});

// Evita injeção de HTML vindo dos dados
function escapeHTML(str) {
    if (typeof str !== "string") return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
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

    // --- Extração segura das propriedades ---

    // Identificação básica
    const tituloPrincipal = livro.titulo || "";
    const subtitulo = livro.subtitulo || "";
    const seculo = livro.seculo || "";
    const idioma = livro.idioma || "";
    const nota = livro.nota || "";

    // Categoria (objeto: principal + secundaria[])
    const categoriaPrincipal = extrairCampo(livro.categoria, "principal");

    // Descrição (objeto: curta + temas_principais[])
    const descricaoCurta = extrairCampo(livro.descricao, "curta");

    // Referências (objeto: texto_original + estudos_academicos[])
    // const textoOriginal = livro.referencias?.texto_original;
    // const estudosAcademicos = livro.referencias?.estudos_academicos || [];

    // Traduções disponíveis
    const traducoes = livro.traducao_disponivel || [];

    // Coleção (objeto completo)
    const colecao = livro.colecao || {};
    const nomeColecao = colecao.nome || "";
    const codiceColecao = colecao.codice || "";
    const localizacaoFisica = colecao.localizacao_fisica || "";
    const anoDescoberta = colecao.ano_descoberta || "";
    const localDescoberta = colecao.local_descoberta || "";

    // --- Montagem do HTML ---

    article.innerHTML = `
        <div class="book-card-header">
            <span class="book-card-category">
                <strong>Categoria:</strong> ${escapeHTML(categoriaPrincipal)}
            </span>
            <span class="book-card-date">${escapeHTML(seculo)}</span>
        </div>

        <h3 class="book-card-title">${escapeHTML(tituloPrincipal)}</h3>
        ${subtitulo ? `<p class="book-card-subtitle">${escapeHTML(subtitulo)}</p>` : ""}

        <p class="book-card-description">${escapeHTML(descricaoCurta)}</p>

        ${nota ? `<p class="book-card-note"><strong>Nota:</strong> ${escapeHTML(nota)}</p>` : ""}

        <div class="book-card-origin">
            <span><strong>Coleção:</strong> ${escapeHTML(nomeColecao)}</span><br>
            ${codiceColecao ? `<span><strong>Códice:</strong> ${escapeHTML(codiceColecao)}</span><br>` : ""}
            ${localizacaoFisica ? `<span><strong>Localização atual:</strong> ${escapeHTML(localizacaoFisica)}</span><br>` : ""}
            ${localDescoberta ? `<span><strong>Local da descoberta:</strong> ${escapeHTML(localDescoberta)}</span><br>` : ""}
            ${anoDescoberta ? `<span><strong>Ano da descoberta:</strong> ${escapeHTML(String(anoDescoberta))}</span><br>` : ""}
            <span><strong>Idioma original:</strong> ${escapeHTML(idioma)}</span>
            ${traducoes.length ? `<br><span><strong>Traduções disponíveis:</strong> ${escapeHTML(traducoes.join(", "))}</span>` : ""}
        </div>
        
        <a href="leitura.html?id=${encodeURIComponent(livro.id)}" class="button-primary">
            Ler Obra
        </a>
    `;

    return article;
}