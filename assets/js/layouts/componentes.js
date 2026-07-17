/**
 * Sistema de Componentes
 * Biblioteca Apócrifa
 *
 * Carrega componentes HTML reutilizáveis.
 */

async function loadComponent(selector, file) {

    const element = document.querySelector(selector);

    if (!element) return;

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Erro ao carregar componente: ${file}`);
        }

        const html = await response.text();

        element.innerHTML = html;

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
    Carrega os componentes
*/
document.addEventListener("DOMContentLoaded", async () => {

    const basePath = getBasePath();

    await loadComponent(
        "[data-component='header']",
        `${basePath}componentes/header.html`
    );

    await loadComponent(
        "[data-component='navbar-desktop']",
        `${basePath}componentes/navbar.html`
    );

    await loadComponent(
        "[data-component='navbar-mobile']",
        `${basePath}componentes/navbar.html`
    );

    await loadComponent(
        "[data-component='footer']",
        `${basePath}componentes/footer.html`
    );

    document.dispatchEvent(
        new CustomEvent("componentsLoaded")
    );

});