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

    document.getElementById("readingArea").scrollIntoView({ behavior: "smooth" });

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
            document.getElementById("readingArea").scrollIntoView({ behavior: "smooth" });
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
    }
}

function irParaProxima() {
    const total = conteudoAtual.conteudo.seccoes.length;
    if (seccaoIndex < total - 1) {
        seccaoIndex++;
        renderSeccaoAtual();
    }
}

function atualizarProgresso(totalSeccoes) {
    const percentual = ((seccaoIndex + 1) / totalSeccoes) * 100;
    document.getElementById("readingProgressBar").style.width = `${percentual}%`;
}

function renderSeccaoAtual() {

    const seccoes = conteudoAtual.conteudo.seccoes;
    const seccao = seccoes[seccaoIndex];

    document.getElementById("chapterTitle").textContent = seccao.titulo;
    document.getElementById("readingText").innerHTML = renderTextoSagrado(seccao.texto_sagrado);
    document.getElementById("exegesis").innerHTML = renderExegese(seccao.exegese);

    atualizarBotoes(seccoes.length);
    atualizarIndiceAtivo();
    atualizarProgresso(seccoes.length);

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

function escapeHTML(str) {
    if (typeof str !== "string") return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}