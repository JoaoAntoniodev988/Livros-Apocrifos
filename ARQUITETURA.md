# Arquitetura do Projeto — Biblioteca Apócrifa

## 4. Arquitetura das Pastas

```
Biblioteca Apócrifa/
├── index.html              → Página inicial (contexto histórico)
├── manifest.json           → PWA (vazio — pendente)
├── sw.js                   → Service Worker PWA (vazio — pendente)
├── acervo/                 → Uma página HTML por livro/texto apócrifo
├── paginas/                → Páginas internas do app (biblioteca, leitura, comunidade, perfil)
├── components/             → Fragmentos HTML reutilizáveis (ex: book-card.html)
└── assets/
    ├── css/                → Estilos (ver seção 5)
    ├── js/                 → Lógica (ver seção 5)
    ├── dados/              → livros.json (fonte de dados dos livros)
    ├── fonts/              → Fontes locais
    └── imagens/            → Imagens/ícones
```

### Ajuste recomendado
Mover `components/book-card.html` para dentro de `assets/` ou criar uma pasta `templates/`.
Hoje ele está solto na raiz, quebrando o padrão de que só `index.html` deveria ficar lá.

---

## 5. Responsabilidade dos Arquivos

### CSS

| Arquivo | Papel | Status |
|---|---|---|
| `variables.css` | Design tokens: cores, fontes, espaçamentos | ✅ Ativo e bem definido |
| `base.css` | Reset + estilos globais (body, html) | ✅ Ativo |
| `layout.css` | Container e espaçamento de seções | ✅ Ativo (mínimo) |
| `components.css` | Componentes reutilizáveis (`.card`, `.card-livro`) | ✅ Ativo |
| `home.css` | Estilos exclusivos da página inicial | ❌ Vazio |
| `biblioteca.css` | Estilos exclusivos da página Biblioteca | ❌ Vazio |
| `leitura.css` | Estilos exclusivos da página de Leitura | ❌ Vazio (e nem está linkado em `leitura.html`) |
| `comunidade.css` | Estilos exclusivos da página Comunidade | ❌ Vazio |
| `perfil.css` | Estilos exclusivos da página Perfil | ❌ Vazio |
| `style.css` | Tentativa antiga de arquitetura via `@import` | 🗑️ Código morto — não usado, referencia pastas (`base/`, `layout/`, `pages/`) que não existem |

### JavaScript

| Arquivo | Papel | Status |
|---|---|---|
| `livros.js` | Array hardcoded de livros (dados) | ⚠️ Duplica `livros.json` com dados diferentes |
| `biblioteca.js` | Renderiza cards de livros na página Biblioteca | ⚠️ Função pronta (`mostrarLivros`), mas chamada comentada |
| `leitura.js` | Busca livro por ID e monta seções + exegese | ⚠️ Pronto, mas não é carregado em `paginas/leitura.html` |

### Outros

| Arquivo | Papel | Status |
|---|---|---|
| `assets/dados/livros.json` | Fonte de dados "oficial" dos livros | ⚠️ Só tem 1 livro, sem campo `secoes` |
| `components/book-card.html` | Fragmento de card de livro | ⚠️ Não integrado via JS ainda |
| `manifest.json` | Configuração PWA | ❌ Vazio |
| `sw.js` | Service Worker (cache offline) | ❌ Vazio |

---

## Ligação atual CSS/JS por página

| Página | CSS específico linkado | JS linkado |
|---|---|---|
| `index.html` | `home.css` (vazio) | nenhum |
| `paginas/biblioteca.html` | `biblioteca.css` (vazio) | `livros.js` + `biblioteca.js` |
| `paginas/leitura.html` | *nenhum* (falta linkar `leitura.css`) | *nenhum* (falta linkar `leitura.js`) |
| `paginas/comunidade.html` | `comunidade.css` (vazio) | nenhum (JS comentado, arquivo nem existe) |
| `paginas/perfil.html` | `perfil.css` (vazio) | nenhum (JS comentado, arquivo nem existe) |

---

*Documento gerado na Fase 2 (Estruturar) do projeto.*
