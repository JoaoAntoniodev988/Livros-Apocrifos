document.addEventListener("componentsLoaded", () => {

    const button = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".mobile-menu");

    if (!button || !menu) return;

    button.addEventListener("click", () => {

        menu.classList.toggle("open");

        button.setAttribute(
            "aria-expanded",
            menu.classList.contains("open")
        );

    });

    // Fecha automaticamente ao voltar para desktop
    window.addEventListener("resize", () => {

        if (window.innerWidth > 640) {

            menu.classList.remove("open");

            button.setAttribute("aria-expanded", "false");

        }

    });

});