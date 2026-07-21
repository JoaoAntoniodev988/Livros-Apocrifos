# Onde adicionar código novo — Biblioteca Apócrifa

Guia rápido de consulta. Antes de escrever uma função nova, encontra a linha
que mais se parece com o que vais fazer.

| Se precisas de... | Vai para... | Exemplo já existente |
|---|---|---|
| Buscar um novo ficheiro JSON | `repositories/` | `livrosRepository.js`, `institucionalRepository.js` |
| Aplicar uma regra de negócio (filtrar, validar, calcular) | `services/` | `bibliotecaService.filtrar()`, `glossarioService.encontrarOcorrencias()` |
| Desenhar um novo tipo de cartão/elemento reutilizável | `components/` | `cardLivro.js`, `fichaTecnicaComponent.js` |
| Ligar um botão/formulário a uma ação, coordenar vários components | `controllers/` | `bibliotecaController.js`, `leituraController.js` |
| Uma nova página HTML | `pages/<nome>.js` | só arranca o controller — nada mais |
| Uma constante que nunca muda (intervalos, limites) | `config/app.config.js` | `autoplayIntervalo` |
| Um caminho de ficheiro de dados | `config/data.config.js` | `livros`, `sobreApocrifos` |
| Uma função pura sem ligação a nenhuma página (validar string, formatar data, sanitizar HTML) | `utils/` | `domUtils.escapeHTML`, `formatUtils.normalizarTexto` |
| Algo partilhado entre todas as páginas (header, footer, tab bar) | `layouts/` | `componentes.js`, `navigation.js` |

## Perguntas de bolso

- **"Isto faz `fetch`?"** → só pode viver em `repositories/`.
- **"Isto mexe no DOM (`innerHTML`, `querySelector`)?"** → não pode ser `service` nem `repository`. É `component` ou `controller`.
- **"Isto decide o quê mostrar com base numa regra (ex: só livros da categoria X)?"** → `service`.
- **"Isto só liga um clique a uma função?"** → `controller`.
- **"Vou usar isto em mais do que uma página?"** → `utils/` (se for lógica pura) ou `components/` (se desenhar algo).

## Sinais de alerta (parar e reorganizar)

- Um `service` com `document.querySelector` lá dentro → mistura de camadas.
- Um `component` com `fetch(...)` lá dentro → devia estar num `repository`.
- Uma `page/*.js` com mais de ~5 linhas → provavelmente devia estar num `controller`.
- Duas funções idênticas em ficheiros diferentes (como aconteceu com `getBasePath`) →
  candidata a subir para `utils/` e ser usada por ambas.

## Estado atual (referência rápida)

Todas as 5 páginas (Home, Biblioteca, Leitura, Comunidade, Perfil) seguem esta
estrutura. Comunidade e Perfil ainda não têm lógica de negócio — só o
`controller` vazio, pronto para receber código quando as funcionalidades
(discussões, favoritos, preferências) forem implementadas.
