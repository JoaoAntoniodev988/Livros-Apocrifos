# Capítulo 1 — Sobre o Projeto

## 1.1 Objetivo

A Biblioteca Apócrifa é uma aplicação web desenvolvida para reunir, organizar e disponibilizar textos apócrifos, gnósticos, patrísticos e manuscritos históricos em um ambiente moderno, acessível e intuitivo.

O projeto nasceu com o propósito de facilitar o estudo dessas obras, oferecendo não apenas o texto integral dos documentos, mas também informações históricas, referências acadêmicas, comentários exegéticos e ferramentas de pesquisa.

Ao contrário de um simples repositório de textos, a Biblioteca Apócrifa foi concebida como uma plataforma de estudo, permitindo que pesquisadores, estudantes e leitores interessados naveguem por uma coleção organizada de documentos históricos.

Embora inicialmente seja uma aplicação totalmente desenvolvida em HTML, CSS e JavaScript puro (Vanilla JavaScript), sua arquitetura foi planejada para permitir crescimento contínuo, possibilitando futuramente a integração com APIs, banco de dados, autenticação de usuários e funcionalidades colaborativas.

---

## 1.2 Filosofia

Todo o desenvolvimento da Biblioteca Apócrifa segue cinco princípios fundamentais.

### Organização

Cada arquivo possui uma responsabilidade única.

A estrutura do projeto foi planejada para permanecer organizada mesmo com centenas de livros e dezenas de módulos.

Nenhum arquivo deve assumir responsabilidades que pertencem a outro.

---

### Escalabilidade

Toda decisão arquitetural considera o crescimento futuro do projeto.

Novos livros, componentes, páginas e funcionalidades devem ser adicionados sem necessidade de reorganizar a estrutura existente.

---

### Reutilização

Sempre que possível, componentes são desenvolvidos para serem reutilizados em diferentes partes da aplicação.

Exemplos:

- CardLivro
- Slider
- Menu
- Modal
- Paginação

Essa abordagem reduz duplicação de código e facilita manutenção.

---

### Separação de Responsabilidades

O projeto adota uma arquitetura em camadas.

Cada camada possui uma função específica.

Services carregam dados.

Pages controlam páginas.

Components renderizam elementos reutilizáveis.

Utils oferecem funções auxiliares.

Core inicializa a aplicação.

Essa separação torna o código mais simples de compreender e manter.

---

### Evolução Contínua

A Biblioteca Apócrifa não é um projeto estático.

Sua arquitetura foi planejada para evoluir gradualmente, permitindo a incorporação de novas funcionalidades sem comprometer a estabilidade do sistema.

---

## 1.3 Público-alvo

A Biblioteca Apócrifa foi desenvolvida para atender diferentes perfis de leitores.

Entre eles:

- estudantes de teologia;
- pesquisadores;
- historiadores;
- professores;
- estudiosos do cristianismo antigo;
- interessados em literatura apócrifa;
- leitores curiosos sobre manuscritos históricos.

Embora o conteúdo possua caráter acadêmico, a interface busca permanecer acessível para qualquer pessoa interessada no tema.

---

## 1.4 Tecnologias Utilizadas

A primeira versão do projeto utiliza exclusivamente tecnologias fundamentais da Web.

### HTML5

Responsável pela estrutura semântica da aplicação.

Todo o conteúdo é organizado utilizando elementos semânticos para favorecer acessibilidade, manutenção e indexação.

---

### CSS3

Responsável pela identidade visual.

O projeto utiliza:

- CSS Modular
- Custom Properties (Variáveis CSS)
- Flexbox
- Grid Layout
- Media Queries
- Design Responsivo

---

### JavaScript (ES6+)

Toda a lógica da aplicação foi desenvolvida utilizando JavaScript moderno, sem frameworks.

Entre os principais recursos utilizados destacam-se:

- Classes
- Módulos organizacionais
- Fetch API
- Async/Await
- Manipulação do DOM
- Eventos
- Componentização

---

### JSON

Os dados da aplicação são armazenados em arquivos JSON.

Essa abordagem desacopla completamente os dados da interface, permitindo adicionar novos livros sem modificar o código HTML.

---

### Git e GitHub

Todo o desenvolvimento é versionado utilizando Git.

O repositório no GitHub funciona como histórico do projeto, controle de versões e portfólio.

---

## 1.5 Estrutura Geral

A Biblioteca Apócrifa está organizada em módulos independentes.

Cada módulo possui uma responsabilidade específica.

Essa organização permite crescimento contínuo sem aumento descontrolado da complexidade.

De forma resumida, a estrutura principal do projeto é composta por:

assets/

Recursos estáticos da aplicação.

Inclui CSS, JavaScript, imagens, fontes e arquivos JSON.

---

componentes/

Arquivos HTML reutilizados em diferentes páginas, como Header e Footer.

---

paginas/

Páginas principais da aplicação.

Exemplos:

- Home
- Biblioteca
- Área de Leitura
- Comunidade
- Perfil

---

docs/

Documentação oficial do projeto.

Inclui este manual, documentação técnica, convenções e histórico arquitetural.

---

README.md

Documento de apresentação do projeto.

Fornece uma visão geral da aplicação, instruções de instalação e informações para desenvolvedores.

---

ARCHITECTURE.md

Registro histórico das decisões arquiteturais tomadas durante o desenvolvimento do projeto.

Este documento complementa o presente manual, registrando a evolução da arquitetura ao longo das diferentes fases do desenvolvimento.
