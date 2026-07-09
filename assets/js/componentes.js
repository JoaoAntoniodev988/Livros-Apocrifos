/**
 * Sistema de Componentes
 * Biblioteca Apócrifa
 *
 * Carrega componentes HTML reutilizáveis.
 */

async function loadComponent(selector, file) {
    const element = document.querySelector(selector);

    if (!element) {
        return;
    }

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Erro ao carregar componente: ${file}`);
        }

        const html = await response.text();

        element.innerHTML = html;

        return element;

    } catch (error) {

        console.error(error);

    }
}

/*
    Detecta o caminho base
*/
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes("/paginas/")) {
        return "../";
    }
    return "";
}

/*
    Carregamento dos componentes globais
*/
document.addEventListener("DOMContentLoaded", async () => {

    const basePath = getBasePath();

    await Promise.all([

        loadComponent(
            "[data-component='header']",
            `${basePath}componentes/header.html`
        ),

        loadComponent(
            "[data-component='footer']",
            `${basePath}componentes/footer.html`
        )

    ]);

    document.dispatchEvent(
        new Event("componentsLoaded")
    );

});