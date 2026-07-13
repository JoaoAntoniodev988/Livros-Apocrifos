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
    const alternativos = livro.titulos_alternativos || [];

    // Índice do alternativo que vai para os parênteses (ex: nome em inglês)
    const indiceDestaque = 1;
    const destaque = alternativos[indiceDestaque];

    // Título principal com o destaque entre parênteses (se existir)
    document.getElementById("bookTitle").textContent = destaque
        ? `${livro.titulo} (${destaque})`
        : livro.titulo;

    // Os demais alternativos (todos, exceto o que foi para os parênteses)
    const resto = alternativos.filter((_, i) => i !== indiceDestaque);

    const descricaoEl = document.getElementById("bookDescription");
    descricaoEl.textContent = resto.length
        ? `${resto.join(", ")}.`
        : "";

    renderFichaTecnica(livro);
}

function renderFichaTecnica(livro) {

    const container = document.getElementById("fichaTecnica");
    if (!container) return;

    const itens = [];

    // --- Autoria e contexto histórico ---

    if (livro.autor) {
        itens.push({ label: "Autor", valor: livro.autor });
    }

    if (livro.tradicao) {
        itens.push({ label: "Tradição", valor: livro.tradicao });
    }

    if (livro.seculo) {
        itens.push({ label: "Datação", valor: livro.seculo });
    }

    // --- Idioma ---

    if (livro.idioma_original) {
        itens.push({ label: "Idioma original", valor: livro.idioma_original });
    }

    if (livro.idioma_manuscrito) {
        itens.push({ label: "Idioma do manuscrito", valor: livro.idioma_manuscrito });
    }

    if (livro.traducao_disponivel?.length) {
        itens.push({ label: "Traduções disponíveis", valor: livro.traducao_disponivel.join(", ") });
    }

    // --- Classificação temática e formal ---

    if (livro.categoria?.principal) {
        itens.push({ label: "Categoria", valor: livro.categoria.principal });
    }

    if (livro.categoria?.secundaria?.length) {
        itens.push({ label: "Temas", valor: livro.categoria.secundaria.join(", ") });
    }

    if (livro.classificacao?.genero_literario) {
        itens.push({ label: "Género literário", valor: livro.classificacao.genero_literario });
    }

    if (livro.classificacao?.testamento) {
        itens.push({ label: "Corpus", valor: livro.classificacao.testamento });
    }

    // --- Proveniência e coleção ---

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

    // --- Fonte do texto original ---

    const fonte = livro.referencias?.texto_original;
    if (fonte) {
        const partes = [fonte.fonte, fonte.editor, fonte.editora, fonte.ano].filter(Boolean);
        itens.push({ label: "Fonte do texto", valor: partes.join(", ") });
    }

    // --- Metadados de leitura ---

    if (livro.metadados?.leitura_estimada_minutos) {
        itens.push({ label: "Leitura estimada", valor: `${livro.metadados.leitura_estimada_minutos} min` });
    }

    if (livro.metadados?.nivel_dificuldade) {
        itens.push({ label: "Nível de dificuldade", valor: livro.metadados.nivel_dificuldade });
    }

    container.innerHTML = `
        ${livro.nota ? `
            <p class="ficha-tecnica__nota"><strong>Nota:</strong> ${escapeHTML(livro.nota)}</p>
        ` : ""}

        <dl class="ficha-tecnica__grid">
            ${itens.map(item => `
                <div class="ficha-tecnica__item">
                    <dt><strong>${escapeHTML(item.label)}</strong></dt>
                    <dd>${escapeHTML(String(item.valor))}</dd>
                </div>
            `).join("")}
        </dl>

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
                        ${escapeHTML(e.autor || "")}. <em>${escapeHTML(e.titulo || "")}</em>${e.editora ? `, ${escapeHTML(e.editora)}` : ""}${e.ano ? ` (${escapeHTML(String(e.ano))})` : ""}.
                    </li>
                `).join("")}
            </ul>
        </div>
    `;

}

// Reaproveite o mesmo helper que já sugeri no criarCard()
function escapeHTML(str) {
    if (typeof str !== "string") return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
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