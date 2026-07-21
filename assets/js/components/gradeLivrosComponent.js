const gradeLivrosComponent = {

    render(livros) {

        const container = document.getElementById("booksContainer");
        const countEl = document.getElementById("booksCount");

        container.innerHTML = livros.length
            ? livros.map(livro => cardLivroComponent.criarHTML(livro)).join("")
            : `<p class="books-empty">Nenhum livro encontrado.</p>`;

        if (countEl) countEl.textContent = livros.length;

    }

};