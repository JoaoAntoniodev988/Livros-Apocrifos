const estadoVazioComponent = {

    mostrar(texto) {

        document.getElementById("bookTitle").textContent = "";
        document.getElementById("bookDescription").textContent = "";
        fichaTecnicaComponent.esconder();

        const container = document.querySelector(".reading-header .container");

        const aviso = document.createElement("div");
        aviso.className = "reading-empty-state";
        aviso.innerHTML = `
            <p>${texto}</p>
            <a href="biblioteca.html" class="button-primary">Ir para a Biblioteca</a>
        `;

        container.appendChild(aviso);

    }

};