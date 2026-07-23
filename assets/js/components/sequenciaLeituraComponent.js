const sequenciaLeituraComponent = {

    async init() {

        const ultima = historicoService.obterUltimaLeitura();
        const section = document.getElementById("sequenciaLeituraSection");

        if (!ultima) {
            section.hidden = true;
            return;
        }

        const livro = await livrosService.getPorId(ultima.livroId);

        if (!livro) {
            section.hidden = true;
            return;
        }

        section.hidden = false;

        const percentual = Math.round(((ultima.seccaoIndex + 1) / ultima.totalSeccoes) * 100);

        document.getElementById("sequenciaLivroTitulo").textContent = livro.titulo;
        document.getElementById("sequenciaResumo").textContent =
            `Continuar na secção ${ultima.seccaoIndex + 1} de ${ultima.totalSeccoes}`;
        document.getElementById("sequenciaProgresso").textContent = `${percentual}% concluído`;

        document.getElementById("sequenciaLeituraCard").href =
            `paginas/leitura.html?id=${encodeURIComponent(livro.id)}`;

    }

};