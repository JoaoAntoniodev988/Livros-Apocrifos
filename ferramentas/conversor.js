const htmlInput = document.getElementById("htmlInput");
const output = document.getElementById("output");
const button = document.getElementById("convertButton");

/* ==========================================================
   EXTRAI O CONTEÚDO DE UM ELEMENTO
========================================================== */

function extrairConteudo(elemento) {

    const conteudo = [];

    [...elemento.children].forEach(node => {

        switch (node.tagName) {

            case "P":

                conteudo.push({
                    tipo: "paragrafo",
                    texto: node.innerHTML.trim()
                });

                break;

            case "H3":

                conteudo.push({
                    tipo: "subtitulo",
                    texto: node.textContent.trim()
                });

                break;

            case "BLOCKQUOTE":

                conteudo.push({
                    tipo: "citacao",
                    texto: node.innerHTML.trim()
                });

                break;

            case "UL":

                conteudo.push({
                    tipo: "lista",
                    itens: [...node.children].map(li => li.innerHTML.trim())
                });

                break;

            case "OL":

                conteudo.push({
                    tipo: "lista-numerada",
                    itens: [...node.children].map(li => li.innerHTML.trim())
                });

                break;

            case "IMG":

                conteudo.push({
                    tipo: "imagem",
                    src: node.getAttribute("src"),
                    alt: node.getAttribute("alt") ?? ""
                });

                break;

            case "HR":

                conteudo.push({
                    tipo: "divisor"
                });

                break;

            case "TABLE":

                conteudo.push({
                    tipo: "tabela",
                    html: node.outerHTML
                });

                break;

            case "FIGURE":

                conteudo.push({
                    tipo: "figura",
                    html: node.outerHTML
                });

                break;

            case "PRE":

                conteudo.push({
                    tipo: "codigo",
                    texto: node.textContent
                });

                break;

            default:

                console.warn(
                    "Elemento ignorado:",
                    node.tagName
                );

        }

    });

    return conteudo;

}

/* ==========================================================
   EXTRAI UM CAPÍTULO
========================================================== */

function extrairCapitulo(section) {

    const capitulo = {

        id: section.id,

        titulo: section.querySelector("h2")?.textContent.trim() || "",

        conteudo: [],

        exegese: []

    };

    const texto = section.querySelector(".texto-sagrado");

    if (texto) {
        capitulo.conteudo = extrairConteudo(texto);
    }

    const exegese = section.querySelector(".exegese");

    if (exegese) {
        capitulo.exegese = extrairConteudo(exegese);
    }

    return capitulo;

}

/* ==========================================================
   EXTRAI O LIVRO
========================================================== */

function extrairLivro(documento) {

    const sections = [...documento.querySelectorAll("section")];

    return sections.map(section => extrairCapitulo(section));

}

/* ==========================================================
   CONVERTE HTML PARA JSON
========================================================== */

function converterLivro() {

    const html = htmlInput.value.trim();

    if (!html) {

        alert("Cole o HTML do livro.");

        return;

    }

    const parser = new DOMParser();

    const documento = parser.parseFromString(
        html,
        "text/html"
    );

    const livro = extrairLivro(documento);

    output.textContent = JSON.stringify(
        livro,
        null,
        4
    );

}

/* ==========================================================
   EVENTOS
========================================================== */

button.addEventListener("click", converterLivro);