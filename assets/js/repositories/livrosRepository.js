const livrosRepository = {

    _livros: [],

    async getTodos() {

        if (this._livros.length) {
            return this._livros;
        }

        const caminho = `${getBasePath()}${dataConfig.livros}`;
        const response = await fetch(caminho);

        if (!response.ok) {
            throw new Error(`Falha ao carregar ${caminho}`);
        }

        this._livros = await response.json();
        return this._livros;

    },

    async getConteudoPorArquivo(nomeArquivo) {

        const caminho = `${getBasePath()}${dataConfig.livrosPasta}${nomeArquivo}`;
        const response = await fetch(caminho);

        if (!response.ok) {
            throw new Error(`Falha ao carregar ${caminho}`);
        }

        return await response.json();

    }

};