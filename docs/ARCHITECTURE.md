# Arquitetura da Biblioteca Apócrifa

## Objetivo

Este documento registra todas as decisões arquiteturais tomadas durante o desenvolvimento da Biblioteca Apócrifa.

Seu objetivo é documentar:

- a organização do projeto;
- a responsabilidade de cada módulo;
- as decisões de arquitetura;
- as alterações estruturais realizadas ao longo do desenvolvimento.

---

# Histórico Arquitetural

## Versão 0.1

### Estrutura inicial

Foi criada a arquitetura baseada em camadas para separar responsabilidades.

A estrutura principal ficou organizada em:

- core
- services
- layouts
- components
- pages
- utils

Objetivo:

- evitar código duplicado;
- facilitar manutenção;
- permitir crescimento do projeto.

---

## Services

Foi criado o LivrosService.

Responsabilidade:

Carregar o índice geral de livros.

---

Foi criado o LeituraService.

Responsabilidade:

Carregar o conteúdo completo de um livro.

---

## Components

Foi criado Slider.

Responsabilidade:

Renderizar sliders reutilizáveis.

---

Foi criado CardLivro.

Responsabilidade:

Renderizar qualquer card de livro utilizado na aplicação.

---

## Pages

Cada página possui seu próprio controlador JavaScript.

Exemplos:

- home.js
- biblioteca.js
- leitura.js

Cada arquivo controla apenas sua página.

---

## Princípios adotados

Cada arquivo possui uma única responsabilidade.

Services nunca renderizam HTML.

Pages nunca acessam diretamente o JSON.

Components nunca conhecem a página onde estão sendo utilizados.

Utils apenas auxiliam outras partes da aplicação.

Toda renderização reutilizável deve ficar em Components.