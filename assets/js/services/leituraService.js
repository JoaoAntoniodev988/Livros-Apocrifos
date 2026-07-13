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
    renderFichaTecnica(livro);
}

function renderFichaTecnica(livro) {

    const container = document.getElementById("fichaTecnica");

    const itens = [];

    // Idioma — pode ser string ou objeto
    if (livro.idioma) {
        const idiomaTexto = typeof livro.idioma === "string"
            ? livro.idioma
            : livro.idioma.original;
        itens.push({ label: "<strong>Idioma original:</strong>", valor: idiomaTexto });
    }

    if (livro.traducao_disponivel?.length) {
        itens.push({ label: "<strong>Traduções disponíveis: </strong>", valor: livro.traducao_disponivel.join(", ") });
    }

    if (livro.colecao?.codice) {
        itens.push({ label: "<Strong>Códice</strong>", valor: livro.colecao.codice });
    }

    if (livro.colecao?.local_descoberta) {
        itens.push({ label: "<Strong>Local de descoberta: </strong>", valor: livro.colecao.local_descoberta });
    }

    if (livro.colecao?.ano_descoberta) {
        itens.push({ label: "<Strong>Ano de descoberta</strong>", valor: livro.colecao.ano_descoberta });
    }

    if (livro.colecao?.localizacao_fisica) {
        itens.push({ label: "<Strong>Localização atual</strong>", valor: livro.colecao.localizacao_fisica });
    }

    // Fonte do texto original
    const fonte = livro.referencias?.texto_original;
    if (fonte) {
        const partes = [fonte.fonte, fonte.editor, fonte.editora, fonte.ano].filter(Boolean);
        itens.push({ label: "<Strong>Fonte do texto</strong>", valor: partes.join(", ") });
    }

    container.innerHTML = `
        <div class="ficha-tecnica__grid">
            ${itens.map(item => `
                <div class="ficha-tecnica__item">
                    <dt>${item.label}</dt>
                    <dd>${item.valor}</dd>
                </div>
            `).join("")}
        </div>

        ${renderEstudosAcademicos(livro.referencias?.estudos_academicos)}
    `;

}

function renderEstudosAcademicos(estudos) {

    if (!estudos || !estudos.length) return "";

    return `
        <div class="ficha-tecnica__estudos">
            <h4>Estudos Académicos</h4>
            <ul>
                ${estudos.map(e => `
                    <li>
                        ${e.autor}. <em>${e.titulo}</em>${e.editora ? `, ${e.editora}` : ""}${e.ano ? ` (${e.ano})` : ""}.
                    </li>
                `).join("")}
            </ul>
        </div>
    `;

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