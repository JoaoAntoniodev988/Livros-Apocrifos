class LivrosService {

    constructor(){

        this.livros = [];

        this.basePath =
            window.location.pathname.includes("/paginas/")
                ? "../"
                : "";

    }

    async carregar(){

        const response = await fetch(
            `${this.basePath}assets/dados/livros.json`
        );

        if(!response.ok){
            throw new Error("Erro ao carregar livros.");
        }

        this.livros = await response.json();

        return this.livros;

    }

    getTodos(){

        return this.livros;

    }

    getPorId(id){

        return this.livros.find(
            livro => livro.id === id
        );

    }

}

const livrosService = new LivrosService();