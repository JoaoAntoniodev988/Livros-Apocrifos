class LivrosService {

    constructor() {
        this.livros = [];
    }

    async carregar() {
        if (this.livros.length) {
            return this.livros;
        }
        const response = await fetch("../assets/dados/livros.json");
        this.livros = await response.json();
        return this.livros;
    }

    async getTodos() {
        return await this.carregar();
    }

    async getPorId(id) {
        const livros = await this.carregar();
        return livros.find(livro => livro.id === id);
    }

    async getConteudo(livro) {

        const nomeArquivo = livro.descricao?.arquivo || livro.arquivo;

        if (!nomeArquivo) {
            throw new Error(`Livro "${livro.id}" não tem o campo "arquivo" definido (nem em descricao.arquivo, nem na raiz).`);
        }

        const caminho = `../assets/dados/livros/${nomeArquivo}`;
        const response = await fetch(caminho);

        if (!response.ok) {
            throw new Error(`Não foi possível carregar o conteúdo de: ${caminho}`);
        }

        return await response.json();
    }

}

const livrosService = new LivrosService();