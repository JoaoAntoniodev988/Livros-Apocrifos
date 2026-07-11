document.addEventListener("componentsLoaded", () => {

    console.log("Menu inicializado");

    const button = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".mobile-menu");

    console.log(button);
    console.log(menu);

    if (!button || !menu) return;

    button.addEventListener("click", () => {

        console.log("Clique");

        menu.classList.toggle("open");

        button.setAttribute(
            "aria-expanded",
            menu.classList.contains("open")
        );

    });

});