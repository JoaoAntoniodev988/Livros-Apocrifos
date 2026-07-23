document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const seccaoParam = params.get("seccao");
    const paragrafoParam = params.get("paragrafo");

    const seccaoInicial = seccaoParam !== null ? parseInt(seccaoParam, 10) : null;
    const paragrafoInicial = paragrafoParam !== null ? parseInt(paragrafoParam, 10) : null;

    leituraController.init(id, seccaoInicial, paragrafoInicial);

});