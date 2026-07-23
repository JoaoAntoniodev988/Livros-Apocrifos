const storageCore = {

    get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(key);
            return raw !== null ? JSON.parse(raw) : fallback;
        } catch (erro) {
            console.error(`Erro ao ler "${key}" do storage:`, erro);
            return fallback;
        }
    },

    set(key, valor) {
        try {
            localStorage.setItem(key, JSON.stringify(valor));
            return true;
        } catch (erro) {
            console.error(`Erro ao guardar "${key}" no storage:`, erro);
            return false;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    }

};