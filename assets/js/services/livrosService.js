const livrosService = {

    async carregar() {
        return await livrosRepository.getTodos();
    },

    async getTodos() {
        return await this.carregar();
    },

    async getPorId(id) {
        const livros = await this.carregar();
        return livros.find(livro => livro.id === id);
    },

    async getConteudo(livro) {

        const nomeArquivo = livro.descricao?.arquivo || livro.arquivo;

        if (!nomeArquivo) {
            throw new Error(`Livro "${livro.id}" não tem o campo "arquivo" definido.`);
        }

        return await livrosRepository.getConteudoPorArquivo(nomeArquivo);

    }

};