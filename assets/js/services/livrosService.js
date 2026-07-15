class LivrosService {

    constructor() {
        this.livros = [];
    }

    async carregar() {
        if (this.livros.length) {
            return this.livros;
        }
        const response = await fetch("../assets/dados/livros.json");
        this.livros = await response.json();
        return this.livros;
    }

    async getTodos() {
        return await this.carregar();
    }

    async getPorId(id) {
        const livros = await this.carregar();
        return livros.find(livro => livro.id === id);
    }

    async getConteudo(livro) {

        const nomeArquivo = livro.descricao?.arquivo || livro.arquivo;

        if (!nomeArquivo) {
            throw new Error(`Livro "${livro.id}" não tem o campo "arquivo" definido (nem em descricao.arquivo, nem na raiz).`);
        }

        const caminho = `../assets/dados/livros/${nomeArquivo}`;
        const response = await fetch(caminho);

        if (!response.ok) {
            throw new Error(`Não foi possível carregar o conteúdo de: ${caminho}`);
        }

        return await response.json();
    }

}

const livrosService = new LivrosService();

// Visão geral
// LivrosService é a camada de acesso a dados (data layer) da aplicação — isola todo o fetch e parsing de JSON, para que o resto do código (como o script de leitura que vimos) nunca precise de saber onde ou como os dados estão guardados. É instanciado uma única vez no fim (const livrosService = new LivrosService()) e exportado como singleton global.
// 1. constructor()
// Inicializa this.livros = [] — este array funciona como cache em memória de todo o catálogo.
// 2. carregar()
// Responsável por buscar o catálogo completo (livros.json) uma única vez:

// Se this.livros já tem conteúdo, devolve-o imediatamente sem novo fetch (cache hit).
// Caso contrário, faz o fetch, faz parse do JSON, guarda em this.livros, e devolve.

// Isto é o padrão lazy load + memoize: o catálogo só é pedido ao servidor na primeira vez que for necessário, e todas as chamadas seguintes (de qualquer função, em qualquer página) reaproveitam o mesmo array.
// ⚠️ Ponto a notar: não há proteção contra chamadas concorrentes. Se getPorId() e getTodos() forem chamados ao mesmo tempo antes do primeiro fetch terminar, this.livros.length ainda é 0 nos dois casos, e ambos disparam um fetch próprio (desperdício, embora não gere bug funcional já que os resultados são idênticos). Se quiseres, posso mostrar como resolver isto guardando a Promise em vez do resultado.
// 3. getTodos()
// Wrapper fino sobre carregar() — existe para dar uma API mais semântica a quem consome o serviço (ex: uma página de índice/catálogo que lista todos os livros).
// 4. getPorId(id)
// Garante que o catálogo está carregado, depois procura o livro pelo campo id com Array.find. É esta função que o leitura.html chama com o id vindo da query string.
// 5. getConteudo(livro)
// A função mais interessante — responsável por resolver e buscar o ficheiro de conteúdo (secções, texto sagrado, exegese) associado a um livro do catálogo:

// Resolve o nome do ficheiro com fallback: primeiro tenta livro.descricao?.arquivo, depois livro.arquivo na raiz. Isto sugere que o teu schema ainda não está 100% padronizado — há livros com o campo aninhado em descricao e possivelmente outros na raiz.
// Lança erro explícito e descritivo se nenhum dos dois existir — boa prática, facilita debugging.
// Monta o caminho (../assets/dados/livros/{arquivo}) e faz fetch.
// Verifica response.ok explicitamente e lança erro com o caminho exato se falhar — mais informativo do que deixar o erro genérico do fetch.
// Devolve o JSON do conteúdo (é este objeto que o leitura.html guarda em conteudoAtual e usa em conteudoAtual.conteudo.seccoes).

// Relação com o leitura.html
// Chamada no leitura.htmlMétodo correspondentelivrosService.getPorId(id)busca metadados do livro no catálogolivrosService.getConteudo(livro)busca o ficheiro de secções/texto daquele livro
// Ou seja: dois ficheiros JSON por livro — um entra no livros.json (catálogo/metadados, o que alimenta renderFichaTecnica) e outro é o ficheiro individual em livros/{arquivo} (o conteúdo narrativo, o que alimenta renderSeccaoAtual).