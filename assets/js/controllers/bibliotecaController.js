const bibliotecaController = {

    todosLivros: [],
    filtroAtual: { busca: "" },

    async init() {

        this.todosLivros = await livrosService.getTodos();

        this._initPesquisa();
        this._aplicarFiltros();

    },

    _initPesquisa() {

        const form = document.querySelector(".search-form");
        const input = form.querySelector("input[type='search']");

        const atualizarBusca = () => {
            this.filtroAtual.busca = input.value.trim();
            this._aplicarFiltros();
        };

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            atualizarBusca();
        });

        input.addEventListener("input", atualizarBusca);

    },

    _aplicarFiltros() {
        const resultado = bibliotecaService.filtrar(this.todosLivros, this.filtroAtual);
        gradeLivrosComponent.render(resultado);
    }

};