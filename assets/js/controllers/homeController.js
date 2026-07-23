const homeController = {

    async init() {

        await this._initFraseDoMomento();

        // As próximas secções ficam por agora, até resolvermos a lógica delas:
        // this._initSaibaMais();
        // this._initSequenciaLeitura();

        notaModalComponent.init();

    },

    async _initFraseDoMomento() {

        try {

            const frase = await frasesService.obterFraseAleatoria();

            if (!frase) {
                document.getElementById("fraseMomentoSection").hidden = true;
                return;
            }

            fraseMomentoComponent.init(frase);

        } catch (erro) {
            console.error("Erro ao carregar frase do momento:", erro);
        }

    }

};