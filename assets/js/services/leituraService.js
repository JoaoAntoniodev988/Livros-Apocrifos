let livroAtual = null;
let conteudoAtual = null;
let seccaoIndex = 0;

document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.getElementById("chapterTitle").textContent = "Livro não encontrado.";
        return;
    }

    const livro = await livrosService.getPorId(id);

    if (!livro) {
        document.getElementById("chapterTitle").textContent = "Livro inexistente.";
        return;
    }

    const conteudo = await livrosService.getConteudo(livro);

    livroAtual = livro;
    conteudoAtual = conteudo;

    renderCabecalho(livro);
    renderSeccaoAtual();

    document.getElementById("btnAnterior").addEventListener("click", () => {
        if (seccaoIndex > 0) {
            seccaoIndex--;
            renderSeccaoAtual();
        }
    });

    document.getElementById("btnProxima").addEventListener("click", () => {
        const total = conteudoAtual.conteudo.seccoes.length;
        if (seccaoIndex < total - 1) {
            seccaoIndex++;
            renderSeccaoAtual();
        }
    });

});
function renderCabecalho(livro) {
    const alternativos = livro.titulos_alternativos || [];

    // Índice do alternativo que vai para os parênteses (ex: nome em inglês)
    const indiceDestaque = 1;
    const destaque = alternativos[indiceDestaque];

    // Título principal com o destaque entre parênteses (se existir)
    document.getElementById("bookTitle").textContent = destaque
        ? `${livro.titulo} (${destaque})`
        : livro.titulo;

    // Os demais alternativos (todos, exceto o que foi para os parênteses)
    const resto = alternativos.filter((_, i) => i !== indiceDestaque);

    const descricaoEl = document.getElementById("bookDescription");
    descricaoEl.textContent = resto.length
        ? `${resto.join(", ")}.`
        : "";

    renderFichaTecnica(livro);
}

function renderFichaTecnica(livro) {

    const container = document.getElementById("fichaTecnica");
    if (!container) return;

    const itens = [];

    // --- Autoria e contexto histórico ---

    if (livro.autor) {
        itens.push({ label: "Autor", valor: livro.autor });
    }

    if (livro.tradicao) {
        itens.push({ label: "Tradição", valor: livro.tradicao });
    }

    if (livro.seculo) {
        itens.push({ label: "Datação", valor: livro.seculo });
    }

    // --- Idioma ---

    if (livro.idioma_original) {
        itens.push({ label: "Idioma original", valor: livro.idioma_original });
    }

    if (livro.idioma_manuscrito) {
        itens.push({ label: "Idioma do manuscrito", valor: livro.idioma_manuscrito });
    }

    if (livro.traducao_disponivel?.length) {
        itens.push({ label: "Traduções disponíveis", valor: livro.traducao_disponivel.join(", ") });
    }

    // --- Classificação temática e formal ---

    if (livro.categoria?.principal) {
        itens.push({ label: "Categoria", valor: livro.categoria.principal });
    }

    if (livro.categoria?.secundaria?.length) {
        itens.push({ label: "Temas", valor: livro.categoria.secundaria.join(", ") });
    }

    if (livro.classificacao?.genero_literario) {
        itens.push({ label: "Género literário", valor: livro.classificacao.genero_literario });
    }

    if (livro.classificacao?.testamento) {
        itens.push({ label: "Corpus", valor: livro.classificacao.testamento });
    }

    // --- Proveniência e coleção ---

    if (livro.colecao?.nome) {
        itens.push({ label: "Coleção", valor: livro.colecao.nome });
    }

    if (livro.colecao?.codice) {
        itens.push({ label: "Códice", valor: livro.colecao.codice });
    }

    if (livro.colecao?.local_descoberta) {
        itens.push({ label: "Local de descoberta", valor: livro.colecao.local_descoberta });
    }

    if (livro.colecao?.ano_descoberta) {
        itens.push({ label: "Ano de descoberta", valor: livro.colecao.ano_descoberta });
    }

    if (livro.colecao?.localizacao_fisica) {
        itens.push({ label: "Localização atual", valor: livro.colecao.localizacao_fisica });
    }

    // --- Fonte do texto original ---

    const fonte = livro.referencias?.texto_original;
    if (fonte) {
        const partes = [fonte.fonte, fonte.editor, fonte.editora, fonte.ano].filter(Boolean);
        itens.push({ label: "Fonte do texto", valor: partes.join(", ") });
    }

    // --- Metadados de leitura ---

    if (livro.metadados?.leitura_estimada_minutos) {
        itens.push({ label: "Leitura estimada", valor: `${livro.metadados.leitura_estimada_minutos} min` });
    }

    if (livro.metadados?.nivel_dificuldade) {
        itens.push({ label: "Nível de dificuldade", valor: livro.metadados.nivel_dificuldade });
    }

    container.innerHTML = `
        ${livro.nota ? `
            <p class="ficha-tecnica__nota"><strong>Nota:</strong> ${escapeHTML(livro.nota)}</p>
        ` : ""}

        <dl class="ficha-tecnica__grid">
            ${itens.map(item => `
                <div class="ficha-tecnica__item">
                    <dt><strong>${escapeHTML(item.label)}</strong></dt>
                    <dd>${escapeHTML(String(item.valor))}</dd>
                </div>
            `).join("")}
        </dl>

        ${renderEstudosAcademicos(livro.referencias?.estudos_academicos)}
    `;

}

function renderEstudosAcademicos(estudos) {

    if (!estudos || !estudos.length) return "";

    return `
        <div class="ficha-tecnica__estudos">
            <h4>Estudos Académicos</h4>
            <ul>
                ${estudos.map(e => `
                    <li>
                        ${escapeHTML(e.autor || "")}. <em>${escapeHTML(e.titulo || "")}</em>${e.editora ? `, ${escapeHTML(e.editora)}` : ""}${e.ano ? ` (${escapeHTML(String(e.ano))})` : ""}.
                    </li>
                `).join("")}
            </ul>
        </div>
    `;

}

// Reaproveite o mesmo helper que já sugeri no criarCard()
function escapeHTML(str) {
    if (typeof str !== "string") return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function renderSeccaoAtual() {

    const seccoes = conteudoAtual.conteudo.seccoes;
    const seccao = seccoes[seccaoIndex];

    document.getElementById("chapterTitle").textContent = seccao.titulo;
    document.getElementById("readingText").innerHTML = renderTextoSagrado(seccao.texto_sagrado);
    document.getElementById("exegesis").innerHTML = renderExegese(seccao.exegese);

    atualizarBotoes(seccoes.length);

}

function renderTextoSagrado(texto) {

    if (!texto) return "";

    let html = "";

    if (texto.paragrafos) {
        html += texto.paragrafos.map(p => `<p>${p}</p>`).join("");
    }

    if (texto.dialogo_divino) {
        const falas = Array.isArray(texto.dialogo_divino)
            ? texto.dialogo_divino
            : [texto.dialogo_divino];
        html += falas.map(fala => `<blockquote class="divine-dialogue">${fala}</blockquote>`).join("");
    }

    if (texto.citacoes) {
        const citacoes = Array.isArray(texto.citacoes)
            ? texto.citacoes
            : [texto.citacoes];
        html += `<ul class="citations">${citacoes.map(c => `<li>${c}</li>`).join("")}</ul>`;
    }

    return html;

}

function renderExegese(exegese) {

    if (!exegese) return "";

    const paragrafos = exegese.paragrafos || [];
    const referencias = exegese.referencias || [];

    return `
        <h3>${exegese.titulo || "Exegese"}</h3>
        ${paragrafos.map(p => `<p>${p}</p>`).join("")}
        ${
            referencias.length
            ? `<p class="exegesis-refs"><em>${referencias.join(" · ")}</em></p>`
            : ""
        }
    `;

}

function atualizarBotoes(totalSeccoes) {
    document.getElementById("btnAnterior").disabled = seccaoIndex === 0;
    document.getElementById("btnProxima").disabled = seccaoIndex === totalSeccoes - 1;
}

// Visão geral
// Este ficheiro é o controlador da página leitura.html — ele é responsável por carregar um livro específico, renderizar os seus metadados e permitir a navegação entre secções do texto. Tem três variáveis de estado no topo do módulo (livroAtual, conteudoAtual, seccaoIndex) que mantêm o contexto da leitura em curso.
// 1. Inicialização (DOMContentLoaded)
// Responsável por todo o bootstrap da página:

// Lê o parâmetro id da URL (?id=...) para saber qual livro mostrar.
// Trata dois casos de erro cedo (sem id, ou id inexistente), escrevendo mensagens diretamente no chapterTitle.
// Busca o livro (livrosService.getPorId) e depois o seu conteúdo (livrosService.getConteudo) — duas chamadas assíncronas sequenciais, já que a segunda depende da primeira.
// Guarda os resultados no estado global (livroAtual, conteudoAtual).
// Dispara a primeira renderização: cabeçalho + secção atual (índice 0).
// Regista os listeners dos botões de navegação (Anterior/Próxima).

// 2. Navegação entre secções
// Os dois listeners de clique (btnAnterior, btnProxima) são responsáveis por:

// Incrementar/decrementar seccaoIndex com guardas de limite (não deixa ir abaixo de 0 nem acima do total de secções).
// Re-renderizar apenas a secção atual após a mudança (não recarrega o livro inteiro).

// 3. renderCabecalho(livro)
// Responsável pelo título e subtítulo do livro:

// Escolhe um título alternativo específico (índice fixo 1, hardcoded) para colocar entre parênteses ao lado do título principal — ex: "Título (English Title)".
// Junta os restantes títulos alternativos numa descrição secundária.
// Delega a ficha técnica para renderFichaTecnica.

// ⚠️ Nota: o indiceDestaque = 1 está hardcoded — se algum livro tiver menos de 2 títulos alternativos, destaque será undefined e cai no fallback (livro.titulo sozinho), o que é seguro, mas vale a pena confirmar se é sempre o segundo item do array que queres em destaque.
// 4. renderFichaTecnica(livro)
// Esta é a função mais extensa e a que provavelmente já discutiste antes. É responsável por construir dinamicamente a lista de metadados bibliográficos, agrupados em blocos temáticos:

// Autoria e contexto (autor, tradição, século)
// Idioma (original, manuscrito, traduções disponíveis)
// Classificação (categoria, temas, género literário, corpus/testamento)
// Proveniência (coleção, códice, local/ano de descoberta, localização atual)
// Fonte do texto original (concatenando fonte/editor/editora/ano)
// Metadados de leitura (tempo estimado, dificuldade)

// Cada item só é adicionado ao array itens se o campo existir (optional chaining consistente) — isto é o que torna a função tolerante a esquemas incompletos entre os teus 6 textos. No final, monta o HTML via template literal, incluindo a nota opcional e delegando os estudos académicos a renderEstudosAcademicos.
// 5. renderEstudosAcademicos(estudos)
// Sub-função isolada, responsável só por formatar a lista de referências académicas (autor, título em itálico, editora, ano) — retorna string vazia se não houver estudos.
// 6. escapeHTML(str)
// Utilitário de segurança: usa o truque do div.textContent para sanitizar strings antes de as inserir via innerHTML, prevenindo injeção de HTML nos campos vindos dos dados (autor, valores da ficha técnica, etc.). Nota que é aplicado na ficha técnica, mas não em renderTextoSagrado nem em renderExegese — lá o conteúdo vai direto para innerHTML sem escaping.
// 7. renderSeccaoAtual()
// Orquestra a renderização de uma secção de leitura: título, texto sagrado, exegese, e atualiza o estado dos botões de navegação.
// 8. renderTextoSagrado(texto)
// Responsável por transformar o objeto texto_sagrado em HTML, suportando três formas de conteúdo possíveis e combináveis: parágrafos simples, diálogo divino (blockquote, aceita string ou array), e citações (lista, aceita string ou array). A normalização Array.isArray(...) ? ... : [...] é o padrão que usas para tolerar tanto valor único como array no JSON.
// 9. renderExegese(exegese)
// Semelhante, mas mais simples: título (com fallback "Exegese"), parágrafos, e referências concatenadas com "·".
// 10. atualizarBotoes(totalSeccoes)
// Responsável apenas por ativar/desativar os botões conforme a posição atual (disabled no início e no fim).