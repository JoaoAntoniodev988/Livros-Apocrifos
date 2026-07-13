document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    if (!id) {

        document.getElementById("readingContainer").innerHTML = `
            <h2>Livro não encontrado.</h2>
        `;

        return;

    }

    const livro = await livrosService.getPorId(id);

    if (!livro) {

        document.getElementById("readingContainer").innerHTML = `
            <h2>Livro inexistente.</h2>
        `;

        return;

    }

    renderLivro(livro);

});

function renderLivro(livro){

    const container =
        document.getElementById("readingContainer");

    container.innerHTML = `

        <header class="reading-header">

            <h1>${livro.titulo}</h1>

            <p>${livro.subtitulo || ""}</p>

        </header>

        <div class="reading-content">

            ${renderCapitulos(livro.capitulos)}

        </div>

    `;

}

function renderCapitulos(capitulos){

    return capitulos.map(capitulo=>`

        <section id="${capitulo.id}" class="chapter">

            <h2>${capitulo.titulo}</h2>

            ${renderConteudo(capitulo.conteudo)}

            ${
                capitulo.exegese.length
                ?`

                <aside class="chapter-exegesis">

                    <h3>Exegese</h3>

                    ${renderConteudo(capitulo.exegese)}

                </aside>

                `
                :""
            }

        </section>

    `).join("");

}

function renderConteudo(conteudo){

    return conteudo.map(item=>{

        switch(item.tipo){

            case "paragrafo":

                return `<p>${item.texto}</p>`;

            case "citacao":

                return `
                    <blockquote>
                        ${item.texto}
                    </blockquote>
                `;

            case "subtitulo":

                return `<h3>${item.texto}</h3>`;

            case "lista":

                return `
                    <ul>

                        ${item.itens.map(li=>`<li>${li}</li>`).join("")}

                    </ul>
                `;

            case "lista-numerada":

                return `
                    <ol>

                        ${item.itens.map(li=>`<li>${li}</li>`).join("")}

                    </ol>
                `;

            case "imagem":

                return `
                    <img
                        src="${item.src}"
                        alt="${item.alt}">
                `;

            default:

                return "";

        }

    }).join("");

}