
document.addEventListener("componentsLoaded", () => {

    const currentPage = window.location.pathname
        .split("/")
        .pop() || "index.html";

    const links = document.querySelectorAll(".app-header__nav a");

    links.forEach(link => {

        const href = link.getAttribute("href");

        if (href && href.endsWith(currentPage)) {
            link.classList.add("active");
        }

    });

});