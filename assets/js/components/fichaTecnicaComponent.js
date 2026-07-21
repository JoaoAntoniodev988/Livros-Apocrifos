const fichaTecnicaComponent = {

    render(livro) {

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
            ${livro.nota ? `<p class="ficha-tecnica__nota"><strong>Nota:</strong> ${domUtils.escapeHTML(livro.nota)}</p>` : ""}

            <dl class="ficha-tecnica__grid">
                ${itens.map(([label, valor]) => `
                    <div class="ficha-tecnica__item">
                        <dt><strong>${domUtils.escapeHTML(label)}</strong></dt>
                        <dd>${domUtils.escapeHTML(String(valor))}</dd>
                    </div>
                `).join("")}
            </dl>

            ${this._renderEstudosAcademicos(livro.referencias?.estudos_academicos)}
        `;

    },

    _renderEstudosAcademicos(estudos) {

        if (!estudos?.length) return "";

        return `
            <div class="ficha-tecnica__estudos">
                <h4>Estudos Académicos</h4>
                <ul>
                    ${estudos.map(e => `
                        <li>
                            ${domUtils.escapeHTML(e.autor || "")}. <em>${domUtils.escapeHTML(e.titulo || "")}</em>${e.editora ? `, ${domUtils.escapeHTML(e.editora)}` : ""}${e.ano ? ` (${domUtils.escapeHTML(String(e.ano))})` : ""}.
                        </li>
                    `).join("")}
                </ul>
            </div>
        `;

    },

    colapsar() {
        document.getElementById("fichaTecnicaDetails").open = false;
    },

    esconder() {
        document.getElementById("fichaTecnicaDetails").hidden = true;
    }

};