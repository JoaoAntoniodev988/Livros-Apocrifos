function getBasePath() {
    const path = window.location.pathname;
    return path.includes("/paginas/") ? "../" : "";
}