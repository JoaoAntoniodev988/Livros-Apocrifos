document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("booksContainer");

    if(!container) return;

    const livros = await livrosService.carregar();

    livros.forEach(livro => {

        container.appendChild(
            criarCard(livro)
        );

    });

});

function criarCard(livro){
    const article = document.createElement("article");
    article.className = "book-card"; // Mantém a tua classe original

    // Gera as tags apenas se existirem no JSON
    const tagsHTML = livro.tags && livro.tags.length > 0 
        ? `<div class="book-card-tags">
            ${livro.tags.map(tag => `<span class="book-card-tag">#${tag}</span>`).join('')}
           </div>`
        : '';

    article.innerHTML = `
        <div class="book-card-meta">
            <span class="book-card-category">${livro.categoria || ''}</span>
            <span class="book-card-badge">${livro.seculo || ''}</span>
        </div>

        <h3 class="book-card-title">${livro.titulo}</h3>
        
        ${livro.subtitulo ? `<p class="book-card-subtitle">${livro.subtitulo}</p>` : ''}

        <p class="book-card-author">Por: <strong>${livro.autor || 'Anónimo'}</strong></p>

        <p class="book-card-description">${livro.descricao}</p>

        ${tagsHTML}

        <a href="leitura.html?id=${livro.id}" class="button-primary">
            Ler Obra
        </a>
    `;

    return article;
}