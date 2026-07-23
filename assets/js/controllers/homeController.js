const homeController = {

    async init() {

        await this._initFraseDoMomento();
        setInterval(() => this._initFraseDoMomento(), appConfig.fraseMomentoIntervaloMs);

        await this._initCarrosselInformativo();
        await this._initSequenciaLeitura();

        notaModalComponent.init();

    },

    async _initFraseDoMomento() {

        try {

            const frase = await frasesService.obterFraseAtual();

            if (!frase) {
                document.getElementById("fraseMomentoSection").hidden = true;
                return;
            }

            fraseMomentoComponent.render(frase);

        } catch (erro) {
            console.error("Erro ao carregar frase do momento:", erro);
        }

    },

    async _initCarrosselInformativo() {

        try {
            const slides = await institucionalRepository.getSobreApocrifos();
            await infoCarouselComponent.init(slides);
        } catch (erro) {
            console.error("Erro ao carregar carrossel informativo:", erro);
        }

    },

    async _initSequenciaLeitura() {

        try {
            await sequenciaLeituraComponent.init();
        } catch (erro) {
            console.error("Erro ao carregar sequência de leitura:", erro);
        }

    }

};