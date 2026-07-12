class LivrosService {

    constructor() {

        this.livros = [];

    }

    async carregar() {

        const response = await fetch(
            "assets/data/livros.json"
        );

        this.livros = await response.json();

        return this.livros;

    }

    getTodos() {

        return this.livros;

    }

    getPorId(id) {

        return this.livros.find(
            livro => livro.id === id
        );

    }

}

const livrosService =
    new LivrosService();