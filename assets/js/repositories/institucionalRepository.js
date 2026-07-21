const institucionalRepository = {

    async getSobreApocrifos() {

        const caminho = `${getBasePath()}${dataConfig.sobreApocrifos}`;
        const response = await fetch(caminho);

        if (!response.ok) {
            throw new Error(`Falha ao carregar ${caminho}`);
        }

        const dados = await response.json();
        return dados.slides || [];

    }

};