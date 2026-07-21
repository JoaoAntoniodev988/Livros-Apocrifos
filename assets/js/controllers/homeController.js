const homeController = {

    async init() {

        try {
            const slides = await institucionalRepository.getSobreApocrifos();
            await infoCarouselComponent.init(slides);
        } catch (erro) {
            console.error("Erro ao carregar conteúdo institucional:", erro);
        }

        try {
            const livros = await livrosService.getTodos();
            bookCarouselComponent.init(livros);
        } catch (erro) {
            console.error("Erro ao carregar livros em destaque:", erro);
        }

    }

};