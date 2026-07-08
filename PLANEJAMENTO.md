# Planejamento — Biblioteca Apócrifa

Este documento registra o planejamento inicial do projeto, seguindo o funil:

**Planejar → Estruturar → Projetar → Construir → Testar → Melhorar → Publicar**

---

## 1. Ideia do Projeto

**Nome:** Biblioteca Apócrifa

**Conceito:** Uma biblioteca digital dedicada a textos apócrifos e gnósticos (Nag Hammadi, Manuscritos do Mar Morto, etc.), com fins históricos, literários e acadêmicos.

**Proposta de valor:** Diferente de um PDF ou wiki, o site oferece uma experiência de leitura estruturada: cada livro é dividido em seções, com texto original ao lado de exegese/comentário.

**Público-alvo:** Estudantes de teologia/história das religiões, pesquisadores, curiosos por gnosticismo e literatura apócrifa.

**Módulos funcionais:**
- **Início** — apresentação/contexto histórico
- **Biblioteca** — catálogo/busca de livros
- **Área de Leitura** — leitura com exegese
- **Comunidade** — interação entre leitores
- **Perfil** — conta do usuário

---

## 2. Requisitos

### Requisitos Funcionais

| # | Requisito | Status |
|---|---|---|
| RF1 | Listar livros disponíveis com metadados (título, autor, categoria, tempo de leitura) | ⚠️ Dados inconsistentes entre `livros.js` e `livros.json` |
| RF2 | Pesquisar/filtrar livros por título | ⚠️ Código existe, mas comentado |
| RF3 | Exibir texto de um livro dividido em seções com exegese | ⚠️ JS pronto, JSON não tem essa estrutura ainda |
| RF4 | Navegação entre Início, Biblioteca, Leitura, Comunidade, Perfil | ✅ Pronto |
| RF5 | Comunidade (comentários/discussão) | ❌ Não iniciado |
| RF6 | Perfil de usuário | ❌ Não iniciado |
| RF7 | Funcionar como PWA (instalável, offline) | ❌ `manifest.json` e `sw.js` vazios |

### Requisitos Não Funcionais
- Leve, sem frameworks pesados (HTML/CSS/JS puro)
- Responsivo (mobile-first)
- Acessível (boa tipografia e contraste para textos longos)
- Performance: pensar em carregamento sob demanda conforme o JSON cresce

### Fora de Escopo (por agora)
- Backend/login real
- Banco de dados (projeto estático com JSON local)

---

## 3. Roadmap

```
FASE 1 — PLANEJAR
  [x] 1. Ideia do projeto
  [x] 2. Requisitos
  [x] 3. Roadmap

FASE 2 — ESTRUTURAR
  [ ] 4. Arquitetura das pastas        → validar/ajustar estrutura existente
  [ ] 5. Responsabilidade dos arquivos → documentar função de cada JS/CSS
  [ ] 6. README inicial                → atualizar (atual tem só 2 linhas)

FASE 3 — PROJETAR
  [ ] 7. Wireframe                     → útil para Biblioteca e Leitura
  [ ] 8. Design System                 → cores/tipografia (tema gnóstico/antigo)
  [ ] 9. Identidade visual             → logo, paleta, ícones

FASE 4 — CONSTRUIR
  [ ] 10. Estrutura HTML     → maioria pronta, faltam Comunidade/Perfil
  [ ] 11. CSS base           → já modular, revisar consistência
  [ ] 12. JS e lógica        → PRIORITÁRIO: unificar livros.js + livros.json,
                                descomentar chamadas, ajustar leitura.js
  [ ] 13. Integrações        → manifest.json + sw.js (PWA)

FASE 5 — TESTAR
  [ ] 14. Testes             → navegação, responsividade, dados

FASE 6 — MELHORAR
  [ ] 15. Refatoração        → limpar HTML gerado por editor, normalizar marcação

FASE 7 — PUBLICAR
  [ ] 16. Publicação         → GitHub Pages
  [ ] 17. Documentação final → README completo
```

### ⚠️ Dívida técnica prioritária
Antes de avançar na Fase 4, é necessário resolver a dessincronização entre:
- `assets/js/livros.js` (lista hardcoded com 3 livros, caminhos que não batem com `acervo/`)
- `assets/dados/livros.json` (apenas 1 livro, sem campo `secoes`)

Essa inconsistência vai quebrar a Biblioteca e a Área de Leitura assim que forem ativadas.

---

*Documento gerado durante a Fase 1 (Planejar) do projeto. Última atualização: Julho de 2026.*
