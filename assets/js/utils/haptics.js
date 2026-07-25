const haptics = {

    suportado() {
        return "vibrate" in navigator;
    },

    // Toque muito leve — trocar slide, marcar/desmarcar algo
    leve() {
        if (this.suportado()) navigator.vibrate(10);
    },

    // Confirmação — guardar nota, marcar favorito
    confirmar() {
        if (this.suportado()) navigator.vibrate(20);
    },

    // Abrir/fechar um modal ou bottom sheet
    transicao() {
        if (this.suportado()) navigator.vibrate(15);
    },

    // Aviso/erro — ação falhou
    aviso() {
        if (this.suportado()) navigator.vibrate([20, 40, 20]);
    }

};