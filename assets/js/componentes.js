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

            throw new Error(
                `Erro ao carregar componente: ${file}`
            );

        }


        const html = await response.text();


        element.innerHTML = html;


    } catch(error) {

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

document.addEventListener("DOMContentLoaded", () => {


    const basePath = getBasePath();



    loadComponent(
        "[data-component='header']",
        `${basePath}assets/components/header.html`
    );



    loadComponent(
        "[data-component='footer']",
        `${basePath}assets/components/footer.html`
    );


});