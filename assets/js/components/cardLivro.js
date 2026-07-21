const cardLivroComponent = {

    criarHTML(livro, { linkBase = "" } = {}) {

        const categoria = livro.categoria?.principal || "";
        const descricao = livro.descricao?.curta || "";

        return `
            <a href="${linkBase}leitura.html?id=${encodeURIComponent(livro.id)}" class="book-card">
                <span class="book-card__categoria">${domUtils.escapeHTML(categoria)}</span>
                <h3 class="book-card__titulo">${domUtils.escapeHTML(livro.titulo)}</h3>
                <p class="book-card__descricao">${domUtils.escapeHTML(descricao)}</p>
            </a>
        `;

    }

};