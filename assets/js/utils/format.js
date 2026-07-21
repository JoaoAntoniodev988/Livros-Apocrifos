const formatUtils = {

    // Remove acentos para permitir pesquisa "joao" encontrar "João"
    normalizarTexto(str) {
        if (typeof str !== "string") return "";
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

};