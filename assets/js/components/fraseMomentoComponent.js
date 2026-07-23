const fraseMomentoComponent = {

    render(frase) {

        document.getElementById("fraseMomentoSection").hidden = false;
        document.getElementById("fraseFonte").textContent = frase.livroTitulo;
        document.getElementById("fraseTexto").textContent = frase.texto;

        const paragrafo = frase.paragrafoIndex !== null ? `&paragrafo=${frase.paragrafoIndex}` : "";

        document.getElementById("fraseMomentoLink").href =
            `paginas/leitura.html?id=${encodeURIComponent(frase.livroId)}&seccao=${frase.seccaoIndex}${paragrafo}`;

    }

};