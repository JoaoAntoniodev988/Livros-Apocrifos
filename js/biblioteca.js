const lista = document.querySelector("#lista-livros");


fetch("dados/livros.json")

.then(resposta => resposta.json())

.then(livros => {


    livros.forEach(livro => {


        const card = document.createElement("article");


        card.innerHTML = `

        <h3>${livro.titulo}</h3>

        <p>${livro.descricao}</p>


        <a href="leitura.html?id=${livro.id}">
        Ler livro
        </a>

        `;


        lista.appendChild(card);


    });


})

.catch(erro => {

console.log("Erro ao carregar livros:", erro);

});