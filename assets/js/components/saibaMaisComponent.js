const saibaMaisComponent = {

    init(frase) {

        document.getElementById("saibaMaisSection").hidden = false;
        document.getElementById("saibaMaisTexto").textContent = frase.descricaoCurta || frase.texto;

        document.getElementById("saibaMaisCard").addEventListener("click", () => {
            personalizarSheetComponent.abrir(frase);
        });

    }

};