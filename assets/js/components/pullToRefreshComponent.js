const pullToRefreshComponent = {
  init({ containerSelector, indicatorSelector, onRefresh, limiar = 70 }) {
    this.container = document.querySelector(containerSelector);
    this.indicator = document.querySelector(indicatorSelector);
    this.onRefresh = onRefresh;
    this.limiar = limiar;

    this.inicioY = 0;
    this.distancia = 0;
    this.arrastando = false;
    this.atualizando = false;

    document.addEventListener(
      "touchstart",
      (evento) => this._onTouchStart(evento),
      { passive: true },
    );
    document.addEventListener(
      "touchmove",
      (evento) => this._onTouchMove(evento),
      { passive: false },
    );
    document.addEventListener("touchend", () => this._onTouchEnd());
  },

  _onTouchStart(evento) {
    // Reinicia sempre o estado no início de um novo toque —
    // sem isto, um toque parado (sem arrastar) podia herdar
    // a distância de um gesto anterior e disparar um refresh indevido.
    this.distancia = 0;

    if (window.scrollY > 0 || this.atualizando) {
      this.arrastando = false;
      return;
    }

    this.inicioY = evento.touches[0].clientY;
    this.arrastando = true;
  },

  _onTouchMove(evento) {
    if (!this.arrastando || this.atualizando) return;

    const atualY = evento.touches[0].clientY;
    this.distancia = atualY - this.inicioY;

    if (this.distancia <= 0 || window.scrollY > 0) {
      this.distancia = 0;
      this._atualizarIndicador();
      return;
    }

    evento.preventDefault();

    const distanciaComResistencia = Math.min(
      this.distancia * 0.5,
      this.limiar * 1.5,
    );
    this._atualizarIndicador(distanciaComResistencia);
  },

  _onTouchEnd() {
    if (!this.arrastando || this.atualizando) {
      this.arrastando = false;
      this.distancia = 0;
      return;
    }

    this.arrastando = false;

    const distanciaComResistencia = Math.min(
      this.distancia * 0.5,
      this.limiar * 1.5,
    );

    if (distanciaComResistencia >= this.limiar) {
      this._executarRefresh();
    } else {
      this._atualizarIndicador(0);
    }

    // Garante que nada fica pendente para o próximo gesto
    this.distancia = 0;
  },

  async _executarRefresh() {
    this.atualizando = true;
    this.indicator.classList.add("is-loading");
    this.indicator.style.transform = `translateY(${this.limiar}px)`;

    haptics.confirmar();

    try {
      await this.onRefresh();
    } catch (erro) {
      console.error("Erro ao atualizar:", erro);
    }

    this.indicator.classList.remove("is-loading");
    this._atualizarIndicador(0);
    this.atualizando = false;
  },

  _atualizarIndicador(distancia = this.distancia) {
    if (!this.indicator) return;

    this.indicator.style.transform = `translateY(${distancia}px)`;
    this.indicator.classList.toggle("is-visible", distancia > 10);
    this.indicator.classList.toggle("is-ready", distancia >= this.limiar);
  },
};
