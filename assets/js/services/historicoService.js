const HISTORICO_KEY = "bibliotecaApocrifa.historico";

const historicoService = {

    obterTodos() {
        return storageCore.get(HISTORICO_KEY, {});
    },

    registrar(livroId, seccaoIndex, totalSeccoes, paragrafoIndex = 0) {

        const historico = this.obterTodos();

        historico[livroId] = {
            seccaoIndex,
            totalSeccoes,
            paragrafoIndex,
            atualizadoEm: new Date().toISOString()
        };

        storageCore.set(HISTORICO_KEY, historico);

    },

    obterUltimaLeitura() {

        const historico = this.obterTodos();
        const entradas = Object.entries(historico);

        if (!entradas.length) return null;

        entradas.sort((a, b) => new Date(b[1].atualizadoEm) - new Date(a[1].atualizadoEm));

        const [livroId, dados] = entradas[0];
        return { livroId, ...dados };

    }

};