const frasesService = {

    async obterFraseAleatoria() {

        const livros = await livrosService.getTodos();
        if (!livros.length) return null;

        const livro = livros[Math.floor(Math.random() * livros.length)];
        const conteudo = await livrosService.getConteudo(livro);
        const seccoes = conteudo.conteudo?.seccoes || [];
        if (!seccoes.length) return null;

        const seccao = seccoes[Math.floor(Math.random() * seccoes.length)];
        const paragrafos = seccao.texto_sagrado?.paragrafos;
        const citacoes = seccao.texto_sagrado?.citacoes;

        const origem = (paragrafos?.length && paragrafos)
            || (citacoes?.length && (Array.isArray(citacoes) ? citacoes : [citacoes]))
            || null;

        if (!origem) return null;

        const bruto = origem[Math.floor(Math.random() * origem.length)];

        return {
            livroId: livro.id,
            livroTitulo: livro.titulo,
            descricaoCurta: livro.descricao?.curta || "",
            texto: this._limparHTML(bruto)
        };

    },

    _limparHTML(str) {
        const div = document.createElement("div");
        div.innerHTML = str;
        return div.textContent || "";
    }

};