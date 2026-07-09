document.addEventListener("DOMContentLoaded", () => {

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .replace(".html", "") || "index";

    const links = document.querySelectorAll(".app-header__nav a");

    links.forEach(link => {

        if (link.dataset.page === currentPage) {
            link.classList.add("active");
        }

    });

});