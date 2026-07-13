let livroAtual = null;
let conteudoAtual = null;
let seccaoIndex = 0;

document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("chapterTitle").textContent = "Livro não encontrado.";
        return;
    }

    const livro = await livrosService.getPorId(id);

    if (!livro) {
        document.getElementById("chapterTitle").textContent = "Livro inexistente.";
        return;
    }

    const conteudo = await livrosService.getConteudo(livro);

    livroAtual = livro;
    conteudoAtual = conteudo;

    renderCabecalho(livro);
    renderSeccaoAtual();

    document.getElementById("btnAnterior").addEventListener("click", () => {
        if (seccaoIndex > 0) {
            seccaoIndex--;
            renderSeccaoAtual();
        }
    });

    document.getElementById("btnProxima").addEventListener("click", () => {
        const total = conteudoAtual.conteudo.seccoes.length;
        if (seccaoIndex < total - 1) {
            seccaoIndex++;
            renderSeccaoAtual();
        }
    });

});

function renderCabecalho(livro) {
    document.getElementById("bookTitle").textContent = livro.titulo;
    document.getElementById("bookDescription").textContent = livro.subtitulo || "";
}

function renderSeccaoAtual() {

    const seccoes = conteudoAtual.conteudo.seccoes;
    const seccao = seccoes[seccaoIndex];

    document.getElementById("chapterTitle").textContent = seccao.titulo;
    document.getElementById("readingText").innerHTML = renderTextoSagrado(seccao.texto_sagrado);
    document.getElementById("exegesis").innerHTML = renderExegese(seccao.exegese);

    atualizarBotoes(seccoes.length);

}

function renderTextoSagrado(texto) {

    if (!texto) return "";

    let html = "";

    if (texto.paragrafos) {
        html += texto.paragrafos.map(p => `<p>${p}</p>`).join("");
    }

    if (texto.dialogo_divino) {
        const falas = Array.isArray(texto.dialogo_divino)
            ? texto.dialogo_divino
            : [texto.dialogo_divino];
        html += falas.map(fala => `<blockquote class="divine-dialogue">${fala}</blockquote>`).join("");
    }

    if (texto.citacoes) {
        const citacoes = Array.isArray(texto.citacoes)
            ? texto.citacoes
            : [texto.citacoes];
        html += `<ul class="citations">${citacoes.map(c => `<li>${c}</li>`).join("")}</ul>`;
    }

    return html;

}

function renderExegese(exegese) {

    if (!exegese) return "";

    const paragrafos = exegese.paragrafos || [];
    const referencias = exegese.referencias || [];

    return `
        <h3>${exegese.titulo || "Exegese"}</h3>
        ${paragrafos.map(p => `<p>${p}</p>`).join("")}
        ${
            referencias.length
            ? `<p class="exegesis-refs"><em>${referencias.join(" · ")}</em></p>`
            : ""
        }
    `;

}

function atualizarBotoes(totalSeccoes) {
    document.getElementById("btnAnterior").disabled = seccaoIndex === 0;
    document.getElementById("btnProxima").disabled = seccaoIndex === totalSeccoes - 1;
}