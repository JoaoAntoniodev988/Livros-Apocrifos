const bibliotecaService = {

    obterCategorias(livros) {

        const categorias = new Set();

        livros.forEach(livro => {
            const cat = livro.categoria?.principal;
            if (cat) categorias.add(cat);
        });

        return ["Todos", ...Array.from(categorias).sort()];

    },

    filtrar(livros, { categoria = "Todos", busca = "" } = {}) {

        let resultado = livros;

        if (categoria !== "Todos") {
            resultado = resultado.filter(livro => livro.categoria?.principal === categoria);
        }

        if (busca) {
            const buscaNormalizada = formatUtils.normalizarTexto(busca);
            resultado = resultado.filter(livro => {
                const alvo = formatUtils.normalizarTexto([
                    livro.titulo,
                    livro.subtitulo,
                    livro.descricao?.curta
                ].filter(Boolean).join(" "));
                return alvo.includes(buscaNormalizada);
            });
        }

        return resultado;

    }

};