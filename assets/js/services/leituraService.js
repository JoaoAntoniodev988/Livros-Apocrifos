let livroAtual = null;
let conteudoAtual = null;
let seccaoIndex = 0;

document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        mostrarMensagem("Escolhe um livro na biblioteca para começares a ler.");
        return;
    }

    const livro = await livrosService.getPorId(id);
    if (!livro) {
        mostrarMensagem("Este livro não foi encontrado. Volta à biblioteca e escolhe outro.");
        return;
    }

    livroAtual = livro;
    renderCabecalho(livro);

    document.getElementById("btnComecarLeitura").addEventListener("click", iniciarLeitura);
    document.getElementById("btnAnterior").addEventListener("click", irParaAnterior);
    document.getElementById("btnProxima").addEventListener("click", irParaProxima);

});

// Fecha/mostra o popover do glossário ao clicar num termo destacado
document.addEventListener("click", (evento) => {

    const termo = evento.target.closest(".glossario-termo");

    document.querySelectorAll(".glossario-popover").forEach(p => p.remove());

    if (!termo) return;

    const popover = document.createElement("div");
    popover.className = "glossario-popover";
    popover.innerHTML = `
        <strong>${termo.dataset.termo}</strong>
        <p>${termo.dataset.definicao}</p>
    `;

    termo.appendChild(popover);

    // Corrige a posição para nunca ultrapassar a margem direita do ecrã
    const rect = popover.getBoundingClientRect();
    const margem = 16; // 1rem de respiro

    if (rect.right > window.innerWidth - margem) {
        const excesso = rect.right - (window.innerWidth - margem);
        popover.style.left = `-${excesso}px`;
    }

    evento.stopPropagation();

});

function mostrarMensagem(texto) {

    document.getElementById("bookTitle").textContent = "";
    document.getElementById("bookDescription").textContent = "";
    document.getElementById("fichaTecnicaDetails").hidden = true;

    const container = document.querySelector(".reading-header .container");

    const aviso = document.createElement("div");
    aviso.className = "reading-empty-state";
    aviso.innerHTML = `
        <p>${texto}</p>
        <a href="biblioteca.html" class="button-primary">Ir para a Biblioteca</a>
    `;

    container.appendChild(aviso);

}

function renderCabecalho(livro) {

    const alternativos = livro.titulos_alternativos || [];
    const destaque = alternativos[1];

    document.getElementById("bookTitle").textContent = destaque
        ? `${livro.titulo} (${destaque})`
        : livro.titulo;

    const resto = alternativos.filter((_, i) => i !== 1);
    document.getElementById("bookDescription").textContent = resto.length
        ? `${resto.join(", ")}.`
        : "";

    renderFichaTecnica(livro);

}

function renderFichaTecnica(livro) {

    const container = document.getElementById("fichaTecnica");
    if (!container) return;

    const campos = [
        ["Autor", livro.autor],
        ["Tradição", livro.tradicao],
        ["Datação", livro.seculo],
        ["Idioma original", livro.idioma_original],
        ["Idioma do manuscrito", livro.idioma_manuscrito],
        ["Traduções disponíveis", livro.traducao_disponivel?.join(", ")],
        ["Categoria", livro.categoria?.principal],
        ["Temas", livro.categoria?.secundaria?.join(", ")],
        ["Género literário", livro.classificacao?.genero_literario],
        ["Corpus", livro.classificacao?.testamento],
        ["Coleção", livro.colecao?.nome],
        ["Códice", livro.colecao?.codice],
        ["Local de descoberta", livro.colecao?.local_descoberta],
        ["Ano de descoberta", livro.colecao?.ano_descoberta],
        ["Localização atual", livro.colecao?.localizacao_fisica],
        ["Leitura estimada", livro.metadados?.leitura_estimada_minutos ? `${livro.metadados.leitura_estimada_minutos} min` : null],
        ["Nível de dificuldade", livro.metadados?.nivel_dificuldade],
    ];

    const fonte = livro.referencias?.texto_original;
    if (fonte) {
        campos.push(["Fonte do texto", [fonte.fonte, fonte.editor, fonte.editora, fonte.ano].filter(Boolean).join(", ")]);
    }

    const itens = campos.filter(([, valor]) => valor);

    container.innerHTML = `
        ${livro.nota ? `<p class="ficha-tecnica__nota"><strong>Nota:</strong> ${escapeHTML(livro.nota)}</p>` : ""}

        <dl class="ficha-tecnica__grid">
            ${itens.map(([label, valor]) => `
                <div class="ficha-tecnica__item">
                    <dt><strong>${escapeHTML(label)}</strong></dt>
                    <dd>${escapeHTML(String(valor))}</dd>
                </div>
            `).join("")}
        </dl>

        ${renderEstudosAcademicos(livro.referencias?.estudos_academicos)}
    `;

}

function renderEstudosAcademicos(estudos) {

    if (!estudos?.length) return "";

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

    document.getElementById("readingToc").hidden = false;
    document.getElementById("btnToggleToc").hidden = false;
    document.getElementById("readingArea").hidden = false;
    document.getElementById("readingNavigation").hidden = false;
    document.getElementById("readingProgress").hidden = false;
    document.getElementById("fichaTecnicaDetails").open = false;

    document.getElementById("btnToggleToc").addEventListener("click", () => {
        document.getElementById("readingToc").classList.toggle("is-open");
    });

    document.addEventListener("keydown", navegarComTeclado);

    renderIndice();
    renderSeccaoAtual();
    renderTextosRelacionados(conteudoAtual.textos_relacionados);

    document.getElementById("readingArea").scrollIntoView({ behavior: "smooth" });

}

function renderTextosRelacionados(textos) {

    const section = document.getElementById("textosRelacionadosSection");
    const container = document.getElementById("textosRelacionados");

    if (!textos?.length) {
        section.hidden = true;
        return;
    }

    section.hidden = false;

    container.innerHTML = textos.map(item => `
        <a href="leitura.html?id=${encodeURIComponent(item.id)}" class="textos-relacionados__card">
            <h4>${escapeHTML(item.titulo)}</h4>
            <p>${escapeHTML(item.relacao)}</p>
        </a>
    `).join("");

}

function renderIndice() {

    const container = document.getElementById("tocLista");
    const seccoes = conteudoAtual.conteudo.seccoes;

    container.innerHTML = seccoes.map((seccao, index) => `
        <button class="reading-toc__item" data-index="${index}">
            ${escapeHTML(seccao.titulo)}
        </button>
    `).join("");

    container.querySelectorAll(".reading-toc__item").forEach(btn => {
        btn.addEventListener("click", () => {
            seccaoIndex = parseInt(btn.dataset.index, 10);
            renderSeccaoAtual();
            scrollParaTopoDoTexto();
        });
    });

}

function navegarComTeclado(evento) {

    const tag = document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (evento.key === "ArrowRight") irParaProxima();
    if (evento.key === "ArrowLeft") irParaAnterior();

}

function irParaAnterior() {
    if (seccaoIndex > 0) {
        seccaoIndex--;
        renderSeccaoAtual();
        scrollParaTopoDoTexto();
    }
}

function irParaProxima() {
    const total = conteudoAtual.conteudo.seccoes.length;
    if (seccaoIndex < total - 1) {
        seccaoIndex++;
        renderSeccaoAtual();
        scrollParaTopoDoTexto();
    }
}

function scrollParaTopoDoTexto() {
    document.getElementById("chapterTitle").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSeccaoAtual() {

    const seccoes = conteudoAtual.conteudo.seccoes;
    const seccao = seccoes[seccaoIndex];

    document.getElementById("chapterTitle").textContent = seccao.titulo;
    document.getElementById("readingText").innerHTML = renderTextoSagrado(seccao.texto_sagrado);
    document.getElementById("exegesis").innerHTML = renderExegese(seccao.exegese);

    const glossario = conteudoAtual.recursos_estudo?.glossario;
    aplicarGlossarioNoTexto(document.getElementById("readingText"), glossario);
    aplicarGlossarioNoTexto(document.getElementById("exegesis"), glossario);

    atualizarBotoes(seccoes.length);
    atualizarIndiceAtivo();
    atualizarProgresso(seccoes.length);
    atualizarContador(seccoes.length);

}

function renderTextoSagrado(texto) {

    if (!texto) return "";

    const paragrafos = texto.paragrafos?.map(p => `<p>${p}</p>`).join("") || "";

    const dialogo = texto.dialogo_divino
        ? (Array.isArray(texto.dialogo_divino) ? texto.dialogo_divino : [texto.dialogo_divino])
            .map(fala => `<blockquote class="divine-dialogue">${fala}</blockquote>`).join("")
        : "";

    const citacoes = texto.citacoes
        ? `<ul class="citations">${(Array.isArray(texto.citacoes) ? texto.citacoes : [texto.citacoes]).map(c => `<li>${c}</li>`).join("")}</ul>`
        : "";

    return paragrafos + dialogo + citacoes;

}

function aplicarGlossarioNoTexto(container, glossario) {

    if (!glossario?.length) return;

    const termosOrdenados = [...glossario].sort((a, b) => b.termo.length - a.termo.length);
    const termosJaMarcados = new Set();

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    const nos = [];
    while (walker.nextNode()) nos.push(walker.currentNode);

    nos.forEach(no => {

        const texto = no.textContent;
        const matches = [];

        // Encontra, no texto original, a primeira ocorrência de cada termo ainda por marcar
        termosOrdenados.forEach(item => {
            if (termosJaMarcados.has(item.termo)) return;
            const regex = new RegExp(`\\b(${escapeRegex(item.termo)})\\b`, "i");
            const match = regex.exec(texto);
            if (match) {
                matches.push({ start: match.index, end: match.index + match[0].length, texto: match[0], item });
            }
        });

        if (matches.length === 0) return;

        // Ordena por posição e remove sobreposições
        matches.sort((a, b) => a.start - b.start);
        const finais = [];
        let ultimoFim = -1;
        matches.forEach(m => {
            if (m.start >= ultimoFim) {
                finais.push(m);
                ultimoFim = m.end;
            }
        });

        finais.forEach(m => termosJaMarcados.add(m.item.termo));

        // Constrói o HTML final numa só passagem, sem re-analisar HTML já inserido
        let resultado = "";
        let cursor = 0;

        finais.forEach(m => {
            resultado += escapeHTML(texto.slice(cursor, m.start));
            resultado += `<span class="glossario-termo" data-termo="${escapeHTML(m.item.termo)}" data-definicao="${escapeHTML(m.item.definicao)}">${escapeHTML(m.texto)}</span>`;
            cursor = m.end;
        });

        resultado += escapeHTML(texto.slice(cursor));

        const span = document.createElement("span");
        span.innerHTML = resultado;
        no.replaceWith(span);

    });

}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderExegese(exegese) {

    if (!exegese) return "";

    const paragrafos = (exegese.paragrafos || []).map(p => `<p>${p}</p>`).join("");
    const referencias = exegese.referencias?.length
        ? `<p class="exegesis-refs"><em>${exegese.referencias.join(" · ")}</em></p>`
        : "";

    return `<h3>${exegese.titulo || "Exegese"}</h3>${paragrafos}${referencias}`;

}

function atualizarBotoes(totalSeccoes) {
    document.getElementById("btnAnterior").disabled = seccaoIndex === 0;
    document.getElementById("btnProxima").disabled = seccaoIndex === totalSeccoes - 1;
}

function atualizarIndiceAtivo() {
    document.querySelectorAll(".reading-toc__item").forEach((btn, index) => {
        btn.classList.toggle("is-active", index === seccaoIndex);
    });
}

function atualizarProgresso(totalSeccoes) {
    const percentual = ((seccaoIndex + 1) / totalSeccoes) * 100;
    document.getElementById("readingProgressBar").style.width = `${percentual}%`;
}

function atualizarContador(totalSeccoes) {
    document.getElementById("seccaoContador").textContent = `${seccaoIndex + 1}/${totalSeccoes}`;
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