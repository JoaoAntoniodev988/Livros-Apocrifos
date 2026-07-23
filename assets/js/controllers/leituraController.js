const leituraController = {

    livro: null,
    conteudo: null,
    seccaoIndex: 0,
    paragrafoAlvo: null,

    async init(id, seccaoInicial = null, paragrafoInicial = null) {

        if (!id) {
            estadoVazioComponent.mostrar("Escolhe um livro na biblioteca para começares a ler.");
            return;
        }

        this.livro = await livrosService.getPorId(id);

        if (!this.livro) {
            estadoVazioComponent.mostrar("Este livro não foi encontrado. Volta à biblioteca e escolhe outro.");
            return;
        }

        this._renderCabecalho();

        document.getElementById("btnComecarLeitura").addEventListener("click", () => this._iniciarLeitura());

        glossarioPopoverComponent.init();

        if (seccaoInicial !== null && !Number.isNaN(seccaoInicial)) {
            this.paragrafoAlvo = (paragrafoInicial !== null && !Number.isNaN(paragrafoInicial))
                ? paragrafoInicial
                : null;
            this._iniciarLeitura(seccaoInicial);
        }

    },

    _renderCabecalho() {

        const alternativos = this.livro.titulos_alternativos || [];
        const destaque = alternativos[1];

        document.getElementById("bookTitle").textContent = destaque
            ? `${this.livro.titulo} (${destaque})`
            : this.livro.titulo;

        const resto = alternativos.filter((_, i) => i !== 1);
        document.getElementById("bookDescription").textContent = resto.length
            ? `${resto.join(", ")}.`
            : "";

        fichaTecnicaComponent.render(this.livro);

    },

    async _iniciarLeitura(seccaoInicial = 0) {

        const btn = document.getElementById("btnComecarLeitura");
        btn.disabled = true;
        btn.textContent = "A carregar...";

        try {
            this.conteudo = await livrosService.getConteudo(this.livro);
        } catch (erro) {
            console.error(erro);
            btn.textContent = "Erro ao carregar. Tenta novamente.";
            btn.disabled = false;
            return;
        }

        const totalSeccoes = this.conteudo.conteudo.seccoes.length;
        this.seccaoIndex = Math.min(Math.max(seccaoInicial, 0), totalSeccoes - 1);

        document.getElementById("readingToc").hidden = false;
        document.getElementById("btnToggleToc").hidden = false;
        document.getElementById("readingArea").hidden = false;
        document.getElementById("readingNavigation").hidden = false;
        document.getElementById("readingProgress").hidden = false;
        fichaTecnicaComponent.colapsar();

        indiceComponent.init(this.conteudo.conteudo.seccoes, (index) => {
            this.paragrafoAlvo = null; // navegação manual não deve reaplicar o destaque antigo
            this.seccaoIndex = index;
            this._renderSeccaoAtual();
            navegacaoLeituraComponent.scrollParaTopoDoTexto();
        });

        navegacaoLeituraComponent.init({
            onAnterior: () => this._irParaAnterior(),
            onProxima: () => this._irParaProxima()
        });

        this._renderSeccaoAtual();
        textosRelacionadosComponent.render(this.conteudo.textos_relacionados);

        document.getElementById("readingArea").scrollIntoView({ behavior: "smooth" });

    },

    _irParaAnterior() {
        if (this.seccaoIndex > 0) {
            this.paragrafoAlvo = null;
            this.seccaoIndex--;
            this._renderSeccaoAtual();
            navegacaoLeituraComponent.scrollParaTopoDoTexto();
        }
    },

    _irParaProxima() {
        const total = this.conteudo.conteudo.seccoes.length;
        if (this.seccaoIndex < total - 1) {
            this.paragrafoAlvo = null;
            this.seccaoIndex++;
            this._renderSeccaoAtual();
            navegacaoLeituraComponent.scrollParaTopoDoTexto();
        }
    },

    _renderSeccaoAtual() {

        const seccoes = this.conteudo.conteudo.seccoes;
        const seccao = seccoes[this.seccaoIndex];
        const glossario = this.conteudo.recursos_estudo?.glossario;

        seccaoLeituraComponent.render(seccao, glossario);

        navegacaoLeituraComponent.atualizarBotoes(this.seccaoIndex, seccoes.length);
        indiceComponent.atualizarAtivo(this.seccaoIndex);
        progressoComponent.atualizar(this.seccaoIndex, seccoes.length);

        historicoService.registrar(this.livro.id, this.seccaoIndex, seccoes.length);

        // Deteta automaticamente o parágrafo visível enquanto a pessoa lê,
        // e vai atualizando o histórico com essa posição.
        leituraTrackerComponent.iniciar((paragrafoIndex) => {
            historicoService.registrar(this.livro.id, this.seccaoIndex, seccoes.length, paragrafoIndex);
        });

        // Se chegámos aqui a partir de "continuar leitura", destaca o parágrafo certo.
        if (this.paragrafoAlvo !== null) {
            setTimeout(() => {
                seccaoLeituraComponent.destacarParagrafo(this.paragrafoAlvo);
                this.paragrafoAlvo = null;
            }, 300);
        }

    }

};