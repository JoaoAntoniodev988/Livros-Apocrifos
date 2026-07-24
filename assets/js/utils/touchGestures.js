const touchGestures = {

    // Liga eventos de deslizar (swipe) a um elemento.
    // callbacks: { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown }
    // limiar (threshold): distância mínima em pixels para contar como swipe
    aoDeslizar(elemento, callbacks, limiar = 50) {

        let inicioX = 0;
        let inicioY = 0;
        let inicioTempo = 0;

        elemento.addEventListener("touchstart", (evento) => {
            const toque = evento.touches[0];
            inicioX = toque.clientX;
            inicioY = toque.clientY;
            inicioTempo = Date.now();
        }, { passive: true });

        elemento.addEventListener("touchend", (evento) => {

            const toque = evento.changedTouches[0];
            const deltaX = toque.clientX - inicioX;
            const deltaY = toque.clientY - inicioY;
            const duracao = Date.now() - inicioTempo;

            // Ignora gestos muito lentos (mais parecido com arrastar que deslizar)
            if (duracao > 600) return;

            const horizontal = Math.abs(deltaX) > Math.abs(deltaY);

            if (horizontal && Math.abs(deltaX) > limiar) {
                if (deltaX < 0 && callbacks.onSwipeLeft) callbacks.onSwipeLeft();
                if (deltaX > 0 && callbacks.onSwipeRight) callbacks.onSwipeRight();
            }

            if (!horizontal && Math.abs(deltaY) > limiar) {
                if (deltaY < 0 && callbacks.onSwipeUp) callbacks.onSwipeUp();
                if (deltaY > 0 && callbacks.onSwipeDown) callbacks.onSwipeDown();
            }

        }, { passive: true });

    },

    // Liga um evento de toque simples (tap), distinguindo de um clique arrastado
    aoTocar(elemento, callback, limiarMovimento = 10) {

        let inicioX = 0;
        let inicioY = 0;

        elemento.addEventListener("touchstart", (evento) => {
            const toque = evento.touches[0];
            inicioX = toque.clientX;
            inicioY = toque.clientY;
        }, { passive: true });

        elemento.addEventListener("touchend", (evento) => {

            const toque = evento.changedTouches[0];
            const deltaX = Math.abs(toque.clientX - inicioX);
            const deltaY = Math.abs(toque.clientY - inicioY);

            if (deltaX < limiarMovimento && deltaY < limiarMovimento) {
                callback(evento);
            }

        }, { passive: true });

    }

};

// Temporário, só para diagnóstico — remove depois de confirmar
window.addEventListener("touchstart", () => {
    document.title = "TOQUE DETETADO";
});