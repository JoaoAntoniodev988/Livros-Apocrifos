let livroAtual = null;
let conteudoAtual = null;
let seccaoIndex = 0;

document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("bookTitle").textContent = "Livro não encontrado.";
        return;
    }

    const livro = await livrosService.getPorId(id);

    if (!livro) {
        document.getElementById("bookTitle").textContent = "Livro inexistente.";
        return;
    }

    livroAtual = livro;

    renderCabecalho(livro);
    renderFichaTecnica(livro);

    document.getElementById("btnComecarLeitura").addEventListener("click", iniciarLeitura);

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

async function iniciarLeitura() {

    const btn = document.getElementById("btnComecarLeitura");
    btn.disabled = true;
    btn.textContent = "A carregar...";

    try {
        conteudoAtual = await livrosService.getConteudo(livroAtual);
    } catch (erro) {
        console.error(erro);
        btn.textContent = "Erro ao carregar. Tenta novamente.";
        btn.disabled = false;
        return;
    }

    seccaoIndex = 0;

    document.getElementById("readingArea").hidden = false;
    document.getElementById("readingNavigation").hidden = false;

    renderSeccaoAtual();

    document.getElementById("readingArea").scrollIntoView({ behavior: "smooth" });

}

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
        const falas = Array.isArray(texto.dialogo_divino) ? texto.dialogo_divino : [texto.dialogo_divino];
        html += falas.map(fala => `<blockquote class="divine-dialogue">${fala}</blockquote>`).join("");
    }

    if (texto.citacoes) {
        const citacoes = Array.isArray(texto.citacoes) ? texto.citacoes : [texto.citacoes];
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
        ${referencias.length ? `<p class="exegesis-refs"><em>${referencias.join(" · ")}</em></p>` : ""}
    `;

}

function atualizarBotoes(totalSeccoes) {
    document.getElementById("btnAnterior").disabled = seccaoIndex === 0;
    document.getElementById("btnProxima").disabled = seccaoIndex === totalSeccoes - 1;
}

function renderFichaTecnica(livro) {

    const container = document.getElementById("fichaTecnica");
    const itens = [];

    if (livro.autor) {
        const autorTexto = typeof livro.autor === "string" ? livro.autor : livro.autor.nome;
        itens.push({ label: "Autor", valor: autorTexto });
    }

    if (livro.seculo) {
        itens.push({ label: "Século", valor: livro.seculo });
    }

    if (livro.categoria?.principal) {
        itens.push({ label: "Categoria", valor: livro.categoria.principal });
    }

    if (livro.idioma) {
        const idiomaTexto = typeof livro.idioma === "string" ? livro.idioma : livro.idioma.original;
        itens.push({ label: "Idioma original", valor: idiomaTexto });
    }

    if (livro.traducao_disponivel?.length) {
        itens.push({ label: "Traduções disponíveis", valor: livro.traducao_disponivel.join(", ") });
    }

    if (livro.colecao?.nome) {
        itens.push({ label: "Coleção", valor: livro.colecao.nome });
    }

    if (livro.colecao?.codice) {
        itens.push({ label: "Códice", valor: livro.colecao.codice });
    }

    if (livro.colecao?.local_descoberta) {
        itens.push({ label: "Local de descoberta", valor: livro.colecao.local_descoberta });
    }

    if (livro.colecao?.ano_descoberta) {
        itens.push({ label: "Ano de descoberta", valor: livro.colecao.ano_descoberta });
    }

    if (livro.colecao?.localizacao_fisica) {
        itens.push({ label: "Localização atual", valor: livro.colecao.localizacao_fisica });
    }

    if (livro.leitura_estimada_minutos) {
        itens.push({ label: "Leitura estimada", valor: `${livro.leitura_estimada_minutos} min` });
    }

    if (livro.nivel_dificuldade) {
        itens.push({ label: "Nível", valor: livro.nivel_dificuldade });
    }

    const fonte = livro.referencias?.texto_original;
    if (fonte) {
        const partes = [fonte.fonte, fonte.editor, fonte.editora, fonte.ano].filter(Boolean);
        itens.push({ label: "Fonte do texto", valor: partes.join(", ") });
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