const homeController = {
  async init() {
    await this._initFraseDoMomento();
    setInterval(
      () => this._initFraseDoMomento(),
      appConfig.fraseMomentoIntervaloMs,
    );

    await this._initCarrosselInformativo();
    await this._initSequenciaLeitura();

    await this._initFraseJesus();
    setInterval(() => this._initFraseJesus(), appConfig.fraseJesusIntervaloMs);

    notaModalComponent.init();
    personalizarSheetComponent.init();
    fraseJesusComponent.init();

    pullToRefreshComponent.init({
      containerSelector: "main",
      indicatorSelector: "#pullRefreshIndicator",
      onRefresh: () => this._atualizarTudo(),
    });
  },

  async _atualizarTudo() {
    await Promise.all([
      this._initFraseDoMomento(true),
      this._initFraseJesus(true),
      this._initSequenciaLeitura(),
    ]);
  },

  async _initFraseDoMomento(forcar = false) {
    try {
      const frase = await frasesService.obterFraseAtual(forcar);

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

  async _initFraseJesus(forcar = false) {
    try {
      const frase = await frasesJesusService.obterFraseAtual(forcar);

      if (!frase) {
        document.getElementById("fraseJesusSection").hidden = true;
        return;
      }

      fraseJesusComponent.render(frase);
    } catch (erro) {
      console.error("Erro ao carregar frase de Jesus:", erro);
    }
  },
};
