class LeituraService {
    async carregarLivroCompleto(nomeArquivo) {
        try {
            const response = await fetch(`assets/data/livros/${nomeArquivo}`);
            if (!response.ok) throw new Error("Não foi possível carregar o livro.");
            return await response.json();
        } catch (error) {
            console.error("Erro no LeituraService:", error);
            return null;
        }
    }
}

const leituraService = new LeituraService();