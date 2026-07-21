const progressoComponent = {

    atualizar(indexAtual, total) {

        const percentual = ((indexAtual + 1) / total) * 100;
        document.getElementById("readingProgressBar").style.width = `${percentual}%`;
        document.getElementById("seccaoContador").textContent = `${indexAtual + 1}/${total}`;

    }

};