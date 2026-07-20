# Capítulo 3 — Arquitetura JavaScript

## 3.1 Introdução

Toda a lógica da Biblioteca Apócrifa foi desenvolvida utilizando JavaScript moderno (ES6+) sem o auxílio de frameworks externos.

Em vez de depender de bibliotecas como React, Vue ou Angular, o projeto adota uma arquitetura própria baseada em módulos independentes, organizada segundo o princípio da responsabilidade única (Single Responsibility Principle).

Cada arquivo JavaScript possui uma função específica dentro da aplicação.

Essa organização torna o código mais previsível, facilita a manutenção e reduz o acoplamento entre os diferentes módulos do sistema.

A arquitetura JavaScript está organizada em cinco camadas principais:

- Core
- Services
- Components
- Pages
- Utils
- Layouts

Cada uma delas desempenha um papel específico no funcionamento da aplicação.

---

## Objetivos da Arquitetura

A arquitetura JavaScript foi projetada para atender aos seguintes objetivos:

- separar responsabilidades;
- reduzir duplicação de código;
- facilitar manutenção;
- permitir reutilização de componentes;
- simplificar futuras expansões da aplicação;
- manter baixo acoplamento entre módulos.

Essa organização permite que novos recursos sejam incorporados sem necessidade de alterar módulos já existentes.

---

## Visão Geral da Arquitetura

O funcionamento da aplicação pode ser resumido pelo fluxo abaixo.

            	```text
                 			Utilizador
                     			│
                     			▼
                			Página HTML
                     			│
                     			▼
               			 Page Controller
                     			│
                     			▼
                  			 Service
                     			│
                     			▼
                    		  JSON
                     			│
                     			▼
                  			Component
                     			│
                     			▼
             			 Interface Final
          		```

Cada camada possui uma responsabilidade claramente definida.

Nos próximos tópicos cada uma delas será estudada individualmente.

## 3.2 Camadas da Arquitetura

A arquitetura JavaScript da Biblioteca Apócrifa está organizada em cinco camadas independentes.

Cada camada possui uma responsabilidade específica e comunica-se apenas com as camadas necessárias.

Essa separação reduz o acoplamento entre módulos e facilita a manutenção do sistema.

As camadas são:

Core

Responsável pela inicialização da aplicação.

↓

Pages

Controlam cada página da aplicação.

↓

Services

Obtêm os dados necessários.

↓

Components

Renderizam elementos reutilizáveis.

↓

Utils

Fornecem funções auxiliares para todas as demais camadas.
                    
                    	   CORE
                      		│
          		Inicializa toda aplicação
                      		│
                      		▼
                    	  PAGES
      		Controlam cada página individual
                      		│
                      		▼
                   		SERVICES
          		Carregam dados da aplicação
                      		│
                      		▼
                  		COMPONENTS
        		Transformam dados em interface
                      		│
                      		▼
                     	   DOM
                    
## Regras Gerais da Arquitetura

Para manter a consistência do projeto, toda implementação deve obedecer às seguintes regras:

1. Cada arquivo possui apenas uma responsabilidade.

2. Pages nunca acessam diretamente arquivos JSON.

3. Apenas os Services podem carregar dados.

4. Components nunca realizam requisições.

5. Services nunca manipulam o DOM.

6. Utils não devem depender de nenhuma página específica.

7. O Core é responsável apenas pela inicialização da aplicação.

8. Componentes reutilizáveis nunca devem conter regras específicas de uma página.

9. Toda nova funcionalidade deve respeitar esta arquitetura.

10. Antes de criar um novo módulo, deve-se verificar se já existe um componente ou serviço reutilizável.


# 3.3 Camada Core

## Visão Geral

A camada **Core** representa o núcleo da aplicação.

Ela é responsável por inicializar o sistema, carregar configurações globais, preparar o ambiente de execução e coordenar o funcionamento geral da Biblioteca Apócrifa.

O Core não possui conhecimento sobre regras de negócio específicas, livros, páginas ou componentes visuais.

Seu objetivo é fornecer a infraestrutura necessária para que as demais camadas funcionem corretamente.

Na arquitetura da Biblioteca Apócrifa, o Core ocupa o nível mais alto da aplicação.

```text
                 CORE
                   │
        Inicializa a aplicação
                   │
                   ▼
                Pages
                   ▼
              Services
                   ▼
             Components
```

---

# Estrutura da pasta

```text
assets/js/core/

│
├── app.js
├── config.js
├── router.js
├── storage.js
└── main.js
```

Cada arquivo possui uma responsabilidade única.

---

# main.js

## Responsabilidade

O arquivo **main.js** é o ponto de entrada da aplicação.

Sua responsabilidade é iniciar tudo o que a página necessita para funcionar.

Ele atua como um orquestrador.

Exemplos de responsabilidades:

- iniciar a aplicação;
- carregar componentes globais;
- inicializar menus;
- inicializar sliders;
- iniciar controladores de página;
- registrar eventos globais.

O arquivo **main.js** nunca deve conter regras específicas de uma página.

---

## Fluxo

```text
Página HTML

↓

main.js

↓

Inicializa a aplicação

↓

Componentes Globais

↓

Página pronta
```

---

# app.js

## Responsabilidade

O arquivo **app.js** representa o controlador principal da aplicação.

Enquanto o **main.js** apenas inicia o sistema, o **app.js** coordena os módulos disponíveis.

Exemplos de responsabilidades:

- registrar módulos;
- inicializar serviços globais;
- compartilhar estados gerais;
- coordenar inicializações.

No futuro, caso a aplicação possua autenticação, temas ou internacionalização, esse arquivo será responsável por controlar essas funcionalidades.

---

# config.js

## Responsabilidade

Centraliza todas as configurações da aplicação.

Seu objetivo é evitar valores espalhados pelo código.

Exemplos de configurações:

- caminhos dos arquivos JSON;
- quantidade de livros por página;
- idioma padrão;
- tema padrão;
- versões da aplicação;
- parâmetros globais.

Em vez de escrever:

```javascript
fetch("assets/data/livros.json")
```

utiliza-se:

```javascript
fetch(CONFIG.LIVROS_JSON)
```

Isso facilita futuras alterações.

---

# router.js

## Responsabilidade

Controla a navegação da aplicação.

Na versão atual, a Biblioteca Apócrifa utiliza páginas HTML independentes.

Mesmo assim, existe uma camada responsável por organizar a navegação entre elas.

No futuro, caso a aplicação evolua para um SPA (Single Page Application), este arquivo poderá assumir o controle completo das rotas.

Exemplos:

- Home
- Biblioteca
- Leitura
- Comunidade
- Perfil

---

# storage.js

## Responsabilidade

Centraliza todo acesso ao armazenamento local do navegador. Nenhum outro módulo deve acessar diretamente o LocalStorage. Em vez disso, utiliza-se sempre o Storage.

Exemplo:

Favoritos

↓

Storage

↓

LocalStorage

Isso torna futuras alterações extremamente simples. Se futuramente o projeto utilizar IndexedDB ou banco remoto, apenas este arquivo precisará ser alterado.

---

# Relação entre os Arquivos

```text
              main.js

                  │

                  ▼

               app.js

      ┌──────────┼──────────┐

      ▼          ▼          ▼

 config.js   router.js   storage.js
```

Cada arquivo possui uma função específica. Nenhum deles depende diretamente dos arquivos das páginas.

---

# Boas Práticas

A camada Core deve seguir algumas regras importantes.

✓ Nunca manipular dados dos livros.

✓ Nunca renderizar componentes.

✓ Nunca acessar diretamente arquivos JSON.

✓ Nunca conter regras específicas de uma página.

✓ Apenas coordenar o funcionamento da aplicação.

---

# Resumo

A camada Core representa a infraestrutura da Biblioteca Apócrifa. Ela prepara o ambiente, inicializa os módulos necessários e fornece serviços globais para o restante da aplicação.

Sua principal característica é não conhecer detalhes da regra de negócio, funcionando apenas como a base sobre a qual todas as demais camadas são construídas.

# 3.4 Camada Services

## Visão Geral

A camada **Services** é responsável por toda a comunicação entre a aplicação e os dados. Ela funciona como uma ponte entre os arquivos JSON e o restante do sistema. Nenhuma página da aplicação deve acessar diretamente um arquivo JSON.

Todo acesso aos dados deve ocorrer através de um Service. Essa decisão arquitetural reduz o acoplamento entre as páginas e a estrutura dos dados, tornando a aplicação mais organizada e preparada para futuras evoluções.

Atualmente, a Biblioteca Apócrifa utiliza arquivos JSON como fonte de dados, mas a arquitetura foi planejada para permitir que, futuramente, esses dados possam ser obtidos por meio de uma API REST, banco de dados ou qualquer outro serviço externo sem necessidade de alterar as páginas da aplicação.

---

## Fluxo de Funcionamento

A comunicação com os dados segue sempre o mesmo fluxo.

```text
Página

↓

Page Controller

↓

Service

↓

Arquivo JSON

↓

Service

↓

Page Controller

↓

Component

↓

DOM
```

As páginas nunca conhecem a origem dos dados. Elas apenas solicitam informações ao Service correspondente.

---

# Estrutura da pasta

```text
assets/js/services/

│
├── livrosService.js
├── leituraService.js
├── favoritosService.js
└── pesquisaService.js
```

Cada Service possui uma responsabilidade específica.

---

# livrosService.js

## Responsabilidade

O LivrosService é responsável por carregar o índice geral da biblioteca. Ele trabalha apenas com informações resumidas dos livros. Seu objetivo é fornecer dados para:

- Página Biblioteca;
- Home;
- Pesquisa;
- Destaques;
- Categorias.

O LivrosService nunca carrega o conteúdo completo das obras.

---

## Métodos

### carregar()

Carrega o arquivo livros.json e armazena seu conteúdo em memória.

---

### getTodos()

Retorna todos os livros carregados.

---

### getPorId(id)

Retorna apenas um livro específico.

---

## Exemplo de utilização

```javascript
const livros = await livrosService.carregar();

const todos = livrosService.getTodos();

const livro = livrosService.getPorId("apj-001");
```
---

# leituraService.js

## Responsabilidade

O LeituraService é responsável por carregar o conteúdo completo de uma obra. Cada livro possui seu próprio arquivo JSON. Esse Service recebe o nome do arquivo e retorna toda a estrutura da obra.

Incluindo:
- capítulos;
- conteúdo;
- exegese;
- notas;
- referências;
- coleções.

---

## Fluxo

```text
Leitura

↓

LeituraService

↓

Livro JSON

↓

Objeto Livro

↓

Página de Leitura
```
---

# favoritosService.js

## Responsabilidade

Gerenciar a lista de favoritos do utilizador. Esse Service não conhece o LocalStorage diretamente. Toda comunicação deverá ocorrer através da camada Storage. Entre suas futuras responsabilidades estarão:

- adicionar favorito;
- remover favorito;
- listar favoritos;
- verificar se um livro já foi favoritado.

---

# pesquisaService.js

## Responsabilidade

Centralizar toda a lógica de pesquisa da aplicação.

Em vez de cada página implementar seu próprio mecanismo de busca, toda pesquisa deverá ocorrer neste Service. Exemplos:

Pesquisar por:

- título;
- autor;
- categoria;
- século;
- idioma;
- coleção.

No futuro poderão ser incorporadas pesquisas avançadas sem alterar as páginas existentes.

---

# Comunicação entre Services

Os Services são independentes. Entretanto, eles podem colaborar quando necessário. Exemplo:

```text
Pesquisa

↓

PesquisaService

↓

LivrosService

↓

Resultado
```

Outro exemplo:

```text
Página Leitura

↓

LeituraService

↓

Livro

↓

FavoritosService

↓

Adicionar aos Favoritos
```

---

# O que um Service nunca deve fazer

Para manter a arquitetura consistente, um Service nunca deve:

❌ Criar HTML.

❌ Manipular elementos do DOM.

❌ Adicionar eventos.

❌ Controlar páginas.

❌ Renderizar componentes.

Sua única responsabilidade é fornecer dados.

---

# Benefícios desta arquitetura

A separação dos Services oferece diversas vantagens. Entre elas:

- centralização do acesso aos dados;
- redução da duplicação de código;
- facilidade para testes;
- manutenção simplificada;
- possibilidade de substituir JSON por API sem alterar Pages ou Components.

---

# Resumo

A camada Services representa a porta de entrada para todos os dados da Biblioteca Apócrifa.

Ela isola completamente a origem das informações, permitindo que o restante da aplicação trabalhe apenas com objetos JavaScript, sem conhecer detalhes de como esses dados são obtidos.Essa separação é um dos pilares fundamentais da arquitetura do projeto.
