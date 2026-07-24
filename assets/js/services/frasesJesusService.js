const FRASE_JESUS_KEY = "bibliotecaApocrifa.fraseJesus";

const frasesJesusService = {

    async obterFraseAtual() {

        const cache = storageCore.get(FRASE_JESUS_KEY);
        const agora = Date.now();

        if (cache && (agora - cache.timestamp) < appConfig.fraseJesusIntervaloMs) {
            return cache.frase;
        }

        const frase = await this._sortear();

        if (frase) {
            storageCore.set(FRASE_JESUS_KEY, { frase, timestamp: agora });
        }

        return frase;

    },

    async _sortear() {

        const candidatas = await this._coletarCandidatas();
        if (!candidatas.length) return null;

        return candidatas[Math.floor(Math.random() * candidatas.length)];

    },

    // Percorre todos os livros e secções, recolhendo cada frase_de_jesus encontrada
    async _coletarCandidatas() {

        const livros = await livrosService.getTodos();
        const candidatas = [];

        for (const livro of livros) {

            let conteudo;

            try {
                conteudo = await livrosService.getConteudo(livro);
            } catch (erro) {
                continue; // ignora livros com ficheiro em falta, sem travar os restantes
            }

            const seccoes = conteudo.conteudo?.seccoes || [];

            seccoes.forEach((seccao, seccaoIndex) => {

                const bruto = seccao.texto_sagrado?.frases_de_jesus;
                if (!bruto) return;

                const texto = this._limparHTML(bruto);
                const paragrafoIndex = this._encontrarParagrafo(seccao.texto_sagrado?.paragrafos, texto);

                candidatas.push({
                    livroId: livro.id,
                    livroTitulo: livro.titulo,
                    seccaoIndex,
                    paragrafoIndex,
                    texto
                });

            });

        }

        return candidatas;

    },

    // Encontra em que parágrafo (se algum) o texto da frase também aparece,
    // para permitir destacar o trecho exato ao abrir a leitura.
    _encontrarParagrafo(paragrafos, textoAlvo) {

        if (!paragrafos?.length) return null;

        const index = paragrafos.findIndex(p => this._limparHTML(p).includes(textoAlvo));
        return index >= 0 ? index : null;

    },

    _limparHTML(str) {
        const div = document.createElement("div");
        div.innerHTML = str;
        return (div.textContent || "").trim();
    }

};