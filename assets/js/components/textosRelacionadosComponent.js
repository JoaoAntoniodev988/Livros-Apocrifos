const textosRelacionadosComponent = {

    render(textos) {

        const section = document.getElementById("textosRelacionadosSection");
        const container = document.getElementById("textosRelacionados");

        if (!textos?.length) {
            section.hidden = true;
            return;
        }

        section.hidden = false;

        container.innerHTML = textos.map(item => `
            <a href="leitura.html?id=${encodeURIComponent(item.id)}" class="textos-relacionados__card">
                <h4>${domUtils.escapeHTML(item.titulo)}</h4>
                <p>${domUtils.escapeHTML(item.relacao)}</p>
            </a>
        `).join("");

    }

};