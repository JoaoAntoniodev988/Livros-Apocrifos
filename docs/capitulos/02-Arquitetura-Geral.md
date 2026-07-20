# Capítulo 2 — Arquitetura Geral

## 2.1 Visão Geral da Arquitetura

A arquitetura da Biblioteca Apócrifa foi concebida com o objetivo de manter o projeto organizado, escalável e de fácil manutenção desde as primeiras linhas de código até futuras versões mais complexas.

Embora a primeira versão da aplicação seja desenvolvida utilizando apenas HTML, CSS e JavaScript puro (Vanilla JavaScript), sua estrutura segue princípios adotados em aplicações modernas, permitindo que novas funcionalidades sejam incorporadas sem comprometer a organização existente.

A arquitetura está fundamentada em quatro pilares principais:

- Separação entre interface, lógica e dados;
- Organização modular;
- Escalabilidade;
- Reutilização de componentes.

Esses princípios orientam todas as decisões arquiteturais do projeto.

---

## 2.1.1 Separação entre Interface, Lógica e Dados

Um dos princípios mais importantes da Biblioteca Apócrifa é evitar que diferentes responsabilidades sejam misturadas em um mesmo arquivo.

Cada camada da aplicação possui uma função bem definida.

### Interface

A interface representa tudo aquilo que é apresentado ao usuário.

Ela é composta por:

- HTML
- CSS
- Componentes visuais
- Cards
- Menus
- Botões
- Formulários

Sua responsabilidade é exclusivamente apresentar informações e permitir a interação do usuário com a aplicação.

Ela não deve conter regras de negócio nem manipular diretamente os arquivos de dados.

---

### Lógica

A lógica da aplicação é responsável por controlar o comportamento do sistema.

Ela inclui:

- carregamento de páginas;
- eventos;
- renderização dinâmica;
- filtros;
- pesquisa;
- navegação;
- comunicação entre componentes.

Essa camada é implementada principalmente por meio dos arquivos presentes nas pastas:

- pages/
- components/
- core/

---

### Dados

Os dados da aplicação permanecem totalmente separados da interface.

Todas as informações referentes aos livros são armazenadas em arquivos JSON.

Essa abordagem oferece diversas vantagens:

- facilita manutenção;
- evita duplicação de conteúdo;
- permite adicionar novos livros sem alterar o HTML;
- facilita futuras integrações com APIs ou bancos de dados.

O acesso aos dados é realizado exclusivamente pelos Services.

Nenhuma página deve acessar diretamente um arquivo JSON.

---

                BIBLIOTECA APÓCRIFA

                    Utilizador
                         │
                         ▼
                  Interface (HTML)
                         │
                         ▼
              Lógica (JavaScript)
                         │
                         ▼
              Services (Acesso aos Dados)
                         │
                         ▼
                  Arquivos JSON

## 2.1.2 Organização Modular

Todo o projeto foi dividido em módulos independentes.

Cada módulo possui uma responsabilidade específica.

Exemplo:

core/

Inicialização da aplicação.

---

services/

Comunicação com os arquivos de dados.

---

components/

Elementos reutilizáveis da interface.

---

pages/

Controladores específicos de cada página.

---

utils/

Funções auxiliares reutilizadas em diferentes partes da aplicação.

---

Essa divisão reduz o acoplamento entre os módulos e facilita a evolução do projeto.

---

## 2.1.3 Escalabilidade

A arquitetura foi planejada para crescer de forma contínua.

Isso significa que a adição de novas funcionalidades não exige reorganizar toda a estrutura existente.

Por exemplo, será possível incorporar futuramente:

- autenticação de usuários;
- favoritos sincronizados;
- comentários;
- painel administrativo;
- banco de dados;
- API REST;
- pesquisa avançada;
- internacionalização;
- modo offline;
- Progressive Web App (PWA).

A estrutura atual já considera essa evolução, reduzindo o impacto de futuras implementações.

---

## 2.1.4 Reutilização

Outro princípio fundamental da arquitetura é a reutilização de código.

Sempre que um elemento puder ser utilizado em mais de uma página, ele deverá ser transformado em um componente reutilizável.

Exemplos presentes na Biblioteca Apócrifa:

- CardLivro
- Slider
- Menu
- Header
- Footer
- Modal
- Paginação

Essa abordagem proporciona diversas vantagens:

- reduz duplicação de código;
- facilita manutenção;
- mantém a identidade visual consistente;
- simplifica correções e melhorias.

Sempre que um componente for atualizado, todas as páginas que o utilizam serão automaticamente beneficiadas.

---

## Considerações Finais

A arquitetura da Biblioteca Apócrifa foi projetada para equilibrar simplicidade e capacidade de evolução.

Mesmo sendo desenvolvida inicialmente com tecnologias fundamentais da Web, sua organização segue princípios utilizados em aplicações profissionais, permitindo crescimento gradual sem comprometer a legibilidade, a manutenção ou a qualidade do código.

Os próximos capítulos aprofundarão essa arquitetura, detalhando a organização das pastas, o fluxo interno da aplicação e a responsabilidade de cada módulo que compõe o projeto.


---

# 2.2 Estrutura Completa do Projeto

A Biblioteca Apócrifa está organizada em uma estrutura modular que separa claramente os recursos da aplicação conforme suas responsabilidades.

Essa organização tem como objetivo facilitar a manutenção, incentivar a reutilização de código e permitir que o projeto evolua de forma organizada.

A estrutura atual do projeto é apresentada a seguir.

```text
Biblioteca-Apocrifa/
│
├── assets/
│   ├── css/
│   ├── data/
│   ├── imagens/
│   └── js/
│       ├── core/
│       ├── services/
│       ├── components/
│       ├── pages/
│       └── utils/
│
├── componentes/
│
├── paginas/
│
├── docs/
│   ├── capitulos/
│   ├── ARCHITECTURE.md
│   ├── CHANGELOG.md
│   ├── Manual_Arquitetura.md
│   └── README_DOCS.md
│
├── README.md
├── index.html
└── package.json (caso venha a existir futuramente)
```

A seguir são descritas as responsabilidades de cada diretório da aplicação.

---

## 2.2.1 Pasta assets/

A pasta **assets** reúne todos os recursos estáticos utilizados pela aplicação.

Seu objetivo é concentrar arquivos que não representam páginas, mas que são consumidos por elas.

Ela está dividida em quatro grandes grupos.

### css/

Contém todas as folhas de estilo do projeto.

É responsável pela identidade visual, layout, responsividade e temas da aplicação.

Exemplos:

- style.css
- componentes/
- paginas/

---

### data/

Armazena todos os arquivos JSON utilizados pelo sistema.

Exemplos:

- livros.json
- livros/
- categorias.json (futuramente)
- autores.json (futuramente)

Essa pasta representa a camada de dados da aplicação.

Nenhuma página deve acessar diretamente esses arquivos.

O acesso deve ocorrer exclusivamente através dos Services.

---

### imagens/

Reúne todos os recursos gráficos utilizados na aplicação.

Exemplos:

- capas dos livros;
- ícones;
- logótipos;
- imagens ilustrativas;
- placeholders.

Essa organização evita que imagens fiquem espalhadas pelo projeto.

---

### js/

Centraliza toda a lógica JavaScript da aplicação.

Essa pasta encontra-se dividida em módulos especializados.

Ela representa o núcleo da arquitetura do projeto.

Cada subpasta possui uma responsabilidade específica.

Nos capítulos seguintes cada uma delas será detalhada individualmente.

---

## 2.2.2 Pasta componentes/

A pasta **componentes** armazena componentes HTML reutilizáveis.

Esses componentes são compartilhados entre diversas páginas da aplicação.

Exemplos:

- header.html
- footer.html

Sua utilização evita duplicação de código HTML e facilita futuras alterações de layout.

---

## 2.2.3 Pasta paginas/

Contém todas as páginas da aplicação.

Cada página representa uma funcionalidade principal do sistema.

Exemplos:

- Home
- Biblioteca
- Área de Leitura
- Comunidade
- Perfil

Cada página possui seu próprio controlador JavaScript localizado na pasta **assets/js/pages/**.

---

## 2.2.4 Pasta docs/

A pasta **docs** reúne toda a documentação técnica da Biblioteca Apócrifa.

Ela funciona como a documentação oficial do projeto.

Entre seus documentos encontram-se:

- Manual de Arquitetura;
- Histórico Arquitetural;
- Changelog;
- Guias técnicos;
- Roadmap;
- Capítulos do manual.

Toda decisão importante relacionada à arquitetura deve ser registrada nesta pasta.

---

## 2.2.5 README.md

O arquivo README representa a porta de entrada do projeto.

Seu objetivo é apresentar a Biblioteca Apócrifa para novos desenvolvedores e visitantes do repositório.

Ele contém:

- descrição do projeto;
- instruções de instalação;
- tecnologias utilizadas;
- estrutura básica;
- informações de contribuição.

---

## 2.2.6 index.html

O arquivo index.html representa a página inicial da aplicação.

É o ponto de entrada da interface da Biblioteca Apócrifa.

A partir dele o restante da aplicação é carregado.

---

## Considerações Finais

A estrutura apresentada neste capítulo foi planejada para manter uma clara separação entre recursos visuais, lógica da aplicação, dados e documentação.

Essa organização reduz o acoplamento entre módulos, facilita a manutenção e permite que o projeto continue crescendo sem necessidade de reorganizações estruturais.

Nos próximos capítulos serão detalhadas as camadas JavaScript que compõem o núcleo da aplicação.

---

# 2.3 Organização dos Recursos

A Biblioteca Apócrifa foi estruturada seguindo o princípio da organização por responsabilidade.

Cada recurso do projeto possui um local específico dentro da estrutura de diretórios, evitando duplicação de código, facilitando a manutenção e permitindo a evolução contínua da aplicação.

Os recursos do projeto encontram-se divididos em quatro grandes grupos:

- Estilos (CSS)
- Scripts (JavaScript)
- Dados (JSON)
- Recursos Visuais (Imagens)

Cada grupo possui uma finalidade específica.

---

# 2.3.1 Organização do CSS

Toda a estilização da aplicação encontra-se centralizada na pasta:

```text
assets/css/
```

A estrutura do CSS foi organizada de forma modular.

```text
assets/
└── css/
    ├── style.css
    ├── componentes/
    └── paginas/
```

### style.css

Representa o arquivo principal de estilos da aplicação.

Sua responsabilidade é importar ou reunir os estilos globais do projeto.

Entre eles:

- Reset
- Variáveis CSS
- Tipografia
- Layout global
- Utilitários

Esse arquivo funciona como ponto central da estilização.

---

### componentes/

Contém estilos reutilizáveis.

Cada componente visual possui seu próprio arquivo CSS.

Exemplos:

- header.css
- footer.css
- slider.css
- cardLivro.css
- modal.css

Essa abordagem evita arquivos gigantescos e facilita manutenção.

---

### paginas/

Contém estilos exclusivos de cada página.

Exemplos:

```text
home.css
biblioteca.css
leitura.css
perfil.css
comunidade.css
```

Esses estilos nunca devem ser utilizados em outras páginas.

---

# 2.3.2 Organização do JavaScript

Todo o JavaScript encontra-se centralizado em:

```text
assets/js/
```

A arquitetura JavaScript foi dividida em camadas independentes.

```text
core/
services/
components/
pages/
utils/
```

Cada camada possui uma responsabilidade específica.

Essa organização será detalhada completamente no Capítulo 3.

---

# core/

Responsável pela inicialização da aplicação.

Controla aspectos estruturais do sistema.

Exemplos:

- inicialização
- configurações
- armazenamento
- roteamento

Nenhuma regra de negócio deve ficar nesta camada.

---

# services/

Responsável pela comunicação com os dados.

Exemplos:

- LivrosService
- LeituraService
- PesquisaService
- FavoritosService

Os Services nunca manipulam HTML.

Sua única responsabilidade é fornecer informações para o restante da aplicação.

---

# components/

Contém componentes reutilizáveis.

Exemplos:

- Slider
- CardLivro
- Modal
- Menu
- Paginação

Esses componentes podem ser utilizados em diversas páginas diferentes.

---

# pages/

Cada página possui um controlador próprio.

Exemplos:

```text
home.js
biblioteca.js
leitura.js
perfil.js
```

Esses arquivos controlam exclusivamente sua própria página.

---

# utils/

Reúne funções auxiliares reutilizadas por todo o sistema.

Exemplos:

- validações
- formatação
- manipulação do DOM
- funções utilitárias

Esses arquivos não possuem dependência de páginas específicas.

---

# 2.3.3 Organização dos Dados

Todos os dados da Biblioteca Apócrifa encontram-se na pasta:

```text
assets/data/
```

A estrutura atual é composta por:

```text
assets/
└── data/
    ├── livros.json
    └── livros/
```

---

### livros.json

Representa o índice geral da biblioteca.

Contém apenas informações resumidas de cada obra.

Exemplo:

- título
- descrição
- categoria
- autor
- imagem
- slug

Seu objetivo é alimentar:

- Home
- Biblioteca
- Pesquisa
- Destaques

---

### livros/

Esta pasta contém um arquivo JSON para cada obra.

Exemplo:

```text
apocrifo-de-joao.json
evangelho-de-filipe.json
evangelho-de-tome.json
```

Cada arquivo possui todo o conteúdo do livro.

Incluindo:

- capítulos
- exegese
- referências
- notas
- comentários

Essa estratégia evita carregar centenas de páginas de conteúdo quando o usuário apenas navega pela biblioteca.

---

# 2.3.4 Organização das Imagens

Todas as imagens permanecem centralizadas em:

```text
assets/imagens/
```

Exemplo de organização:

```text
imagens/

livros/
icones/
logos/
backgrounds/
placeholders/
```

Cada categoria possui um diretório próprio.

Essa organização facilita manutenção e localização dos recursos gráficos.

---

# Considerações Finais

A organização dos recursos da Biblioteca Apócrifa foi planejada para manter uma clara separação entre apresentação, lógica, dados e elementos gráficos.

Essa divisão reduz a complexidade do projeto e torna sua evolução mais previsível.

Nos próximos capítulos será apresentada em detalhes a arquitetura JavaScript, explicando como essas camadas interagem para formar a aplicação.
