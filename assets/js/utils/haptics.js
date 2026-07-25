const haptics = {

    suportado() {
        return "vibrate" in navigator;
    },

    // Toque muito leve — trocar slide, marcar/desmarcar algo
    leve() {
        if (this.suportado()) navigator.vibrate(50);
    },

    // Confirmação — guardar nota, marcar favorito
    confirmar() {
        if (this.suportado()) navigator.vibrate(50);
    },

    // Abrir/fechar um modal ou bottom sheet
    transicao() {
        if (this.suportado()) navigator.vibrate(50);
    },

    // Aviso/erro — ação falhou
    aviso() {
        if (this.suportado()) navigator.vibrate([40, 80, 40]);
    }

};