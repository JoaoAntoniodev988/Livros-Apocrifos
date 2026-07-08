const conteudo = document.querySelector("#conteudo");
const titulo = document.querySelector("#titulo");
const descricao = document.querySelector("#descricao");


const parametros = new URLSearchParams(window.location.search);

const idLivro = parametros.get("id");


fetch("dados/livros.json")
.then(resposta => resposta.json())

.then(livros => {


    const livro = livros.find(
        item => item.id == idLivro
    );


    if(!livro){

        titulo.textContent = "Livro não encontrado";
        return;

    }


    titulo.textContent = livro.titulo;

    descricao.textContent = livro.descricao;



    livro.secoes.forEach(secao => {


        const bloco = document.createElement("article");


        bloco.innerHTML = `

        <h2>${secao.titulo}</h2>


        <div class="texto-sagrado">

        ${secao.texto.map(item =>

            `<p>${item.conteudo}</p>`

        ).join("")}

        </div>


        <aside>

        <h3>${secao.exegese.titulo}</h3>

        ${secao.exegese.texto.map(paragrafo =>

            `<p>${paragrafo}</p>`

        ).join("")}


        </aside>

        `;


        conteudo.appendChild(bloco);


    });


});