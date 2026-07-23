const FRASE_MOMENTO_KEY = "bibliotecaApocrifa.fraseMomento";

const frasesService = {

    async obterFraseAtual() {

        const cache = storageCore.get(FRASE_MOMENTO_KEY);
        const agora = Date.now();

        if (cache && (agora - cache.timestamp) < appConfig.fraseMomentoIntervaloMs) {
            return cache.frase;
        }

        const frase = await this._sortear();

        if (frase) {
            storageCore.set(FRASE_MOMENTO_KEY, { frase, timestamp: agora });
        }

        return frase;

    },

    async _sortear() {

        const livros = await livrosService.getTodos();
        if (!livros.length) return null;

        const livro = livros[Math.floor(Math.random() * livros.length)];
        const conteudo = await livrosService.getConteudo(livro);
        const seccoes = conteudo.conteudo?.seccoes || [];
        if (!seccoes.length) return null;

        const seccaoIndex = Math.floor(Math.random() * seccoes.length);
        const seccao = seccoes[seccaoIndex];

        const paragrafos = seccao.texto_sagrado?.paragrafos;
        const citacoes = seccao.texto_sagrado?.citacoes;

        // Preferimos sempre um parágrafo (tem correspondência direta com
        // data-p-index no HTML, permitindo destacar o trecho exato).
        const usaParagrafos = paragrafos?.length > 0;
        const origem = usaParagrafos
            ? paragrafos
            : (citacoes?.length && (Array.isArray(citacoes) ? citacoes : [citacoes])) || null;

        if (!origem) return null;

        const indiceEscolhido = Math.floor(Math.random() * origem.length);
        const bruto = origem[indiceEscolhido];

        return {
            livroId: livro.id,
            livroTitulo: livro.titulo,
            seccaoIndex,
            // Só faz sentido destacar quando a frase veio de um parágrafo real
            paragrafoIndex: usaParagrafos ? indiceEscolhido : null,
            texto: this._limparHTML(bruto)
        };

    },

    _limparHTML(str) {
        const div = document.createElement("div");
        div.innerHTML = str;
        return div.textContent || "";
    }

};