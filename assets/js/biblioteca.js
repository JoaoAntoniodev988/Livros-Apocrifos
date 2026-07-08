const container = document.querySelector(".lista-livros");
const pesquisa = document.querySelector("#pesquisa");

function mostrarLivros(lista){

    container.innerHTML = "";

    lista.forEach(livro=>{

        container.innerHTML += `

<article class="card-livro">

    <div class="livro-topo">

        <div class="capa-livro">

            📖

        </div>

        <div class="info-livro">

            <span class="jornada">${livro.jornada}</span>

            <h3>${livro.titulo}</h3>

            <p>${livro.autor}</p>

        </div>

    </div>

    <div class="livro-footer">

        <span>⏱ ${livro.tempo}</span>

        <a class="btn-ler" href="${livro.arquivo}">
            Ler
        </a>

    </div>

</article>

`;

    });

}

// mostrarLivros(livros);

// pesquisa.addEventListener("input",()=>{

//     const texto = pesquisa.value.toLowerCase();

//     const resultado = livros.filter(livro=>{

//         return livro.titulo.toLowerCase().includes(texto);

//     });

//     mostrarLivros(resultado);

// });