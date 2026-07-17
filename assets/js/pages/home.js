document.addEventListener("DOMContentLoaded", async () => {

    const track = document.querySelector(".books-track");

    if (!track) return;

    // Carrega todos os livros
    const livros = await livrosService.carregar();

    // Apenas os destaques
    const destaques = livros.filter(livro => livro.destaque);

    // Renderiza
    destaques.forEach(livro => {

        track.appendChild(criarCardHome(livro));

    });

    new Slider(".featured-books");

});

function criarCardHome(livro){

    const article = document.createElement("article");

    article.className = "book-card";

    article.innerHTML = `

        <div class="book-card-body">

            <h3>
                ${livro.titulo}
            </h3>

            <p>  
                <strong>Coleção:</strong> ${livro.colecao.nome}<br>

                <strong>Codice:</strong> ${livro.colecao.codice}<br>

                <strong>Localização Física:</strong> ${livro.colecao.localizacao_fisica}

                <br>
                <strong>Ano da Descoberta:</strong> ${livro.colecao.ano_descoberta}

                <br>
                <strong>Local da Descoberta:</strong> ${livro.colecao.local_descoberta}
            </p>

            <a
                href="paginas/leitura.html?id=${livro.id}"
                class="button-primary">

                Ler Obra

            </a>

        </div>

    `;

    return article;

}