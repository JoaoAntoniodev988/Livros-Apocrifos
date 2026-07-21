const glossarioService = {

    // Recebe um texto puro e a lista do glossário; devolve as posições
    // (start/end) dos termos encontrados, sem sobreposições, sem tocar no DOM.
    encontrarOcorrencias(texto, glossario, termosJaUsados) {

        if (!glossario?.length) return [];

        const candidatos = [...glossario].sort((a, b) => b.termo.length - a.termo.length);
        const matches = [];

        candidatos.forEach(item => {
            if (termosJaUsados.has(item.termo)) return;
            const regex = new RegExp(`\\b(${this._escapeRegex(item.termo)})\\b`, "i");
            const match = regex.exec(texto);
            if (match) {
                matches.push({ start: match.index, end: match.index + match[0].length, texto: match[0], item });
            }
        });

        if (matches.length === 0) return [];

        matches.sort((a, b) => a.start - b.start);

        const semSobreposicao = [];
        let ultimoFim = -1;

        matches.forEach(m => {
            if (m.start >= ultimoFim) {
                semSobreposicao.push(m);
                ultimoFim = m.end;
            }
        });

        semSobreposicao.forEach(m => termosJaUsados.add(m.item.termo));

        return semSobreposicao;

    },

    _escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

};