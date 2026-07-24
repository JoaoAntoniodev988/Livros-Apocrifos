const homeController = {

    async init() {

        await this._initFraseDoMomento();
        setInterval(() => this._initFraseDoMomento(), appConfig.fraseMomentoIntervaloMs);

        await this._initCarrosselInformativo();
        await this._initSequenciaLeitura();

        await this._initFraseJesus();
        setInterval(() => this._initFraseJesus(), appConfig.fraseJesusIntervaloMs);

        notaModalComponent.init();
        personalizarSheetComponent.init();
        fraseJesusComponent.init();

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

    },

    async _initFraseJesus() {

        try {

            const frase = await frasesJesusService.obterFraseAtual();

            if (!frase) {
                document.getElementById("fraseJesusSection").hidden = true;
                return;
            }

            fraseJesusComponent.render(frase);

        } catch (erro) {
            console.error("Erro ao carregar frase de Jesus:", erro);
        }

    }

};