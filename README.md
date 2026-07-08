# 📚 Biblioteca Apócrifa

Uma biblioteca digital dedicada a textos apócrifos e gnósticos — Nag Hammadi, Manuscritos do Mar Morto e outros escritos excluídos do cânon bíblico — com fins históricos, literários e académicos.

> **Nota do Editor:** Este site possui fins puramente históricos, literários e académicos. O nosso objetivo é preservar e disponibilizar o acesso à literatura antiga.

## ✨ Sobre o Projeto

A palavra "apócrifo" origina-se do grego *apokryphos* ("oculto"/"secreto"). Este projeto reúne e apresenta esses textos com uma experiência de leitura estruturada: cada obra é dividida em seções, com o texto original ao lado de uma exegese/comentário.

## 🧭 Funcionalidades

- **Início** — apresentação e contexto histórico dos apócrifos
- **Biblioteca** — catálogo pesquisável dos livros disponíveis
- **Área de Leitura** — leitura estruturada por seções, com exegese
- **Comunidade** — espaço de discussão entre leitores *(em desenvolvimento)*
- **Perfil** — conta e preferências do usuário *(em desenvolvimento)*

## 🛠️ Tecnologias

- HTML5, CSS3 e JavaScript puro (sem frameworks)
- Google Fonts (Merriweather + Open Sans)
- PWA *(planejado)* — instalável e com suporte offline

## 📁 Estrutura do Projeto

```
├── index.html          # Página inicial
├── acervo/              # Páginas individuais de cada livro
├── paginas/             # Biblioteca, Leitura, Comunidade, Perfil
├── components/          # Fragmentos HTML reutilizáveis
└── assets/
    ├── css/             # Estilos (design tokens + componentes)
    ├── js/               # Lógica (renderização e busca de livros)
    ├── dados/            # livros.json — fonte de dados
    ├── fonts/
    └── imagens/
```

Veja `ARQUITETURA.md` para o detalhamento completo da responsabilidade de cada arquivo.

## 🗺️ Roadmap

O planejamento completo (ideia, requisitos e roadmap de 17 etapas) está em `PLANEJAMENTO.md`.

**Status atual:** Fase 2 — Estruturar.

## 🚀 Como rodar localmente

Por ser um projeto estático, basta abrir `index.html` em um navegador, ou servir a pasta com qualquer servidor local, por exemplo:

```bash
npx serve .
```

## 📄 Licença

Ver arquivo `LICENSE`.

## ✍️ Autor

João de Sousa António
