document.addEventListener("componentsLoaded", () => {

    const currentPage = window.location.pathname
        .split("/")
        .pop() || "index.html";

    const links = document.querySelectorAll(".tab-bar__item");

    links.forEach(link => {

        const pagina = link.dataset.page;

        if (pagina === currentPage) {
            link.classList.add("is-active");
        }

    });

});