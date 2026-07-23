const NOTAS_KEY = "bibliotecaApocrifa.notas";

const notasService = {

    obterTodas() {
        return storageCore.get(NOTAS_KEY, []);
    },

    adicionar({ livroId, livroTitulo, frase, texto }) {

        const notas = this.obterTodas();

        const nota = {
            id: Date.now().toString(),
            livroId,
            livroTitulo,
            frase,
            texto,
            criadoEm: new Date().toISOString()
        };

        notas.unshift(nota);
        storageCore.set(NOTAS_KEY, notas);

        return nota;

    },

    remover(id) {
        const notas = this.obterTodas().filter(n => n.id !== id);
        storageCore.set(NOTAS_KEY, notas);
    }

};