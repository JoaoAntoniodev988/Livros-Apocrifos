const homeController = {

    async init() {

        try {

            const frase = await frasesService.obterFraseAleatoria();

            if (frase) {
                fraseMomentoComponent.init(frase);
                saibaMaisComponent.init(frase);
            }

        } catch (erro) {
            console.error("Erro ao carregar frase do momento:", erro);
        }

        notaModalComponent.init();
        personalizarSheetComponent.init();

        try {
            await sequenciaLeituraComponent.init();
        } catch (erro) {
            console.error("Erro ao carregar sequência de leitura:", erro);
        }

    }

};