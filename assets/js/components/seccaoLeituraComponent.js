const seccaoLeituraComponent = {

    render(seccao, glossario) {

        document.getElementById("chapterTitle").textContent = seccao.titulo;
        document.getElementById("readingText").innerHTML = this._renderTextoSagrado(seccao.texto_sagrado);
        document.getElementById("exegesis").innerHTML = this._renderExegese(seccao.exegese);

        this._aplicarGlossario(document.getElementById("readingText"), glossario);
        this._aplicarGlossario(document.getElementById("exegesis"), glossario);

    },

    _renderTextoSagrado(texto) {

        if (!texto) return "";

        const paragrafos = texto.paragrafos
            ?.map((p, index) => `<p data-p-index="${index}">${p}</p>`)
            .join("") || "";

        const dialogo = texto.dialogo_divino
            ? (Array.isArray(texto.dialogo_divino) ? texto.dialogo_divino : [texto.dialogo_divino])
                .map(fala => `<blockquote class="divine-dialogue">${fala}</blockquote>`).join("")
            : "";

        const citacoes = texto.citacoes
            ? `<ul class="citations">${(Array.isArray(texto.citacoes) ? texto.citacoes : [texto.citacoes]).map(c => `<li>${c}</li>`).join("")}</ul>`
            : "";

        return paragrafos + dialogo + citacoes;

    },

    _renderExegese(exegese) {

        if (!exegese) return "";

        const paragrafos = (exegese.paragrafos || []).map(p => `<p>${p}</p>`).join("");
        const referencias = exegese.referencias?.length
            ? `<p class="exegesis-refs"><em>${exegese.referencias.join(" · ")}</em></p>`
            : "";

        return `<h3>${exegese.titulo || "Exegese"}</h3>${paragrafos}${referencias}`;

    },

    // Faz scroll até ao parágrafo e aplica um destaque temporário —
    // usado quando a pessoa volta a uma leitura em progresso.
    destacarParagrafo(index) {

        const paragrafo = document.querySelector(`#readingText p[data-p-index="${index}"]`);
        if (!paragrafo) return;

        paragrafo.scrollIntoView({ behavior: "smooth", block: "center" });

        paragrafo.classList.add("paragrafo-destacado");
        setTimeout(() => paragrafo.classList.remove("paragrafo-destacado"), 2500);

    },

    _aplicarGlossario(container, glossario) {

        if (!glossario?.length) return;

        const termosJaUsados = new Set();
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
        const nos = [];
        while (walker.nextNode()) nos.push(walker.currentNode);

        nos.forEach(no => {

            const texto = no.textContent;
            const matches = glossarioService.encontrarOcorrencias(texto, glossario, termosJaUsados);

            if (matches.length === 0) return;

            let resultado = "";
            let cursor = 0;

            matches.forEach(m => {
                resultado += domUtils.escapeHTML(texto.slice(cursor, m.start));
                resultado += `<span class="glossario-termo" data-termo="${domUtils.escapeHTML(m.item.termo)}" data-definicao="${domUtils.escapeHTML(m.item.definicao)}">${domUtils.escapeHTML(m.texto)}</span>`;
                cursor = m.end;
            });

            resultado += domUtils.escapeHTML(texto.slice(cursor));

            const span = document.createElement("span");
            span.innerHTML = resultado;
            no.replaceWith(span);

        });

    }

};