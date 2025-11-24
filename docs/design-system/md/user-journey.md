### **User Journey Detalhado: Da Ideia à Apresentação Final (v2)**

Este documento detalha a jornada do usuário no `presenterai`, incorporando as múltiplas camadas de customização disponíveis em cada etapa do fluxo.

**Personas:**
*   **Ana, a Consultora:** Focada em eficiência e customização para clientes.
*   **Carlos, o Estudante:** Focado em estruturação de conteúdo acadêmico.

---

**Fase 1: Descoberta e Configuração Inicial**

1.  **Chegada e Cadastro:** (O usuário encontra o site, explora a landing page e realiza um cadastro simplificado).
2.  **Boas-vindas e Ponto de Partida (`/app`):**
    *   Ao entrar no `/app`, o usuário encontra uma interface de criação central. No primeiro momento, o foco é a **geração a partir de um prompt de texto**.
    *   **Sugestão:** Futuramente, esta tela poderá agregar outras fontes de criação, como "Importar de um artigo (URL)", "Colar conteúdo bruto" ou "Começar com um template de apresentação (ex: Pitch de Vendas, Relatório Semanal)".
    *   **Seleção do Escopo de Conteúdo:** Antes de mais nada, o usuário define o escopo do que deseja criar:
        *   `MULTI_PAGE` (Apresentação): O fluxo tradicional de múltiplos slides.
        *   `SINGLE_PAGE` (Visual Único): Para criar um fluxograma, mapa mental, etc.

    *   **Configuração da Geração:** Com o escopo definido, o usuário acessa um painel de "Configurações Globais" para guiar a IA. Algumas opções podem variar conforme o escopo:
        *   **Tema/Prompt:** Caixa de texto principal para a ideia. Ex: "Plano de marketing para uma startup de café".
        *   **Quantidade de Slides (Aproximada):** Um slider ou campo numérico (ex: 5-15 slides). *Visível principalmente para o escopo `MULTI_PAGE`.*
        *   **Idioma:** Um dropdown para selecionar o idioma da apresentação (ex: Português, Inglês).
        *   **Palavras-chave Globais:** Tags que devem permear toda a apresentação (ex: "orgânico", "comércio local", "experiência").
        *   **Formato do Slide:** Opções de aspect ratio (ex: 16:9, 4:3).

---

**Fase 2: Refinamento Estrutural (O Editor de Outline)**

1.  **Geração do Outline:** Após submeter o prompt e as configurações, o usuário é levado para o editor de outline (`/app/generate/[generateId]`), onde a IA já propôs uma estrutura inicial.

2.  **A Interface do Editor de Outline por Escopo:** A interface se adapta completamente ao escopo de conteúdo selecionado, oferecendo controle granular e contextual.

    *   **Para o Escopo `MULTI_PAGE` (Apresentação - Fluxo de Slides):**
        *   **Estrutura da Apresentação:** O usuário interage com uma `Lista de Slides`, que é uma lista vertical e reordenável com os títulos de cada slide sugerido.
        *   **Painel de Customização por Slide:** Ao selecionar um slide na lista, um painel de contexto se abre, oferecendo controle granular sobre aquele slide específico.
        *   **Customização Avançada por Slide:**
            *   **Título do Slide:** Campo de texto para editar o título.
            *   **Tipo de Representação Visual (Layout):** Um dropdown crucial que define a estrutura visual do slide.
                *   **Sugestão de Opções:** `Texto e Tópicos`, `Comparação (Side-by-Side)`, `Linha do Tempo`, `Diagrama de Processo (Linear)`, `Diagrama Hierárquico (Organograma)`, `Persona`, `Citação em Destaque`, `Imagem com Legenda`, `Funil de Validação`, `Convergência`, etc.
            *   **Profundidade do Conteúdo:** Um seletor para definir o nível de detalhe do texto que a IA irá gerar.
                *   `Conciso`: Apenas os pontos-chave, ideal para slides de apoio visual.
                *   `Detalhado`: Um ou dois parágrafos explicando o tópico.
                *   `Extenso`: Exploração aprofundada, útil para relatórios.
            *   **Palavras-chave do Slide:** Tags específicas para direcionar o conteúdo daquele slide (ex: no slide "Análise de Concorrência", as palavras-chave podem ser "Starbucks", "cafeterias locais").
        *   **Ações no Outline (MULTI_PAGE):** O usuário pode adicionar novos slides, duplicar existentes (para manter a mesma configuração) ou removê-los.

    *   **Para o Escopo `SINGLE_PAGE` (Visual Único - Ex: Fluxograma, Mapa Mental):**
        *   **Estrutura do Visual:** Em vez de uma lista de slides, o usuário interage diretamente com a estrutura do visual único. Para um **Fluxograma**, seria uma `Lista de Elementos` (nós/etapas) e um editor para as **conexões (setas)**. Para um **Mapa Mental**, seria uma estrutura hierárquica de tópicos e subtópicos.
        *   **Painel de Customização por Elemento/Visual:** Ao selecionar o visual como um todo ou um elemento específico (nó, ramo), um painel permite o ajuste fino:
            *   **Título do Visual/Elemento:** Campo de texto para editar o título geral do visual ou o label de um elemento.
            *   **Tipo de Representação Visual (Layout):** Este é definido globalmente para o visual único (ex: `Fluxograma`, `Mapa Mental`). Dentro do visual, pode haver customização para tipos de elementos (ex: um nó de decisão no fluxograma).
            *   **Profundidade do Conteúdo:** Um seletor para definir o nível de detalhe do texto/informação que a IA irá gerar para o visual como um todo ou para elementos específicos (`Conciso`, `Detalhado`, `Extenso`).
            *   **Palavras-chave do Visual/Elemento:** Tags específicas para direcionar o conteúdo do visual ou de seus elementos.
        *   **Ações no Outline (SINGLE_PAGE):** O usuário pode `adicionar novo elemento` (nó, ramo), `conectar elementos`, e `remover` elementos.

---

**Fase 3: Edição Visual (O Workspace)**

1.  **Geração Visual:** Com o outline refinado, o usuário clica em "Criar Visual". A IA usa as especificações para gerar o conteúdo visual correspondente em Excalidraw.

2.  **O Workspace por Escopo (`/app/presentation/[presentationId]`):** O workspace mantém uma estrutura consistente, mas sua navegação e ferramentas se adaptam ao escopo do conteúdo.

    *   **Para o Escopo `MULTI_PAGE` (Apresentação - Fluxo de Slides):**
        *   **1. Navegação (Coluna Esquerda - Lista de Slides):** Uma lista de miniaturas de todos os slides, permitindo navegação rápida e reordenação (arrastar e soltar). O slide ativo é destacado.
        *   **2. Canvas Principal (Área Central):** O slide selecionado é exibido em um grande canvas de edição estilo Excalidraw, onde o usuário pode manipular diretamente os elementos visuais (desenho livre, formas, texto, cores, etc.).
        *   **3. Ferramentas de Conteúdo (Coluna Direita - Painel de Ações):** Um painel de alto nível com ações focadas no slide como um todo.
            *   **Ações de Geração (IA):** "Gerar novamente o conteúdo", "Alterar o tipo de layout", "Ajustar profundidade do conteúdo".
            *   **Ações Estruturais:** "Adicionar novo slide" (abaixo do atual), "Duplicar slide", "Excluir slide".
        *   **Ajustes Finos:** O usuário pode usar o painel de ferramentas para alterações estruturais/conteúdo via IA, ou as ferramentas do canvas para ajustes manuais.

    *   **Para o Escopo `SINGLE_PAGE` (Visual Único - Ex: Fluxograma, Mapa Mental):**
        *   **1. Navegação (Coluna Esquerda - Visão Geral/Elementos):** Esta área pode mostrar o título do visual único ou ser usada para navegar entre diferentes seções de um diagrama muito grande (ex: zoom em áreas específicas). Para a maioria dos visuais de página única, conterá apenas um item que representa o visual completo.
        *   **2. Canvas Principal (Área Central):** O visual único completo é exibido em um grande canvas de edição estilo Excalidraw para manipulação direta de seus elementos.
        *   **3. Ferramentas de Conteúdo (Coluna Direita - Painel de Ações):** Um painel de alto nível com ações focadas no visual único e seus elementos.
            *   **Ações de Geração (IA):** "Gerar novamente o conteúdo" (para o visual como um todo ou elemento selecionado), "Alterar o estilo visual".
            *   **Ações Estruturais:** "Adicionar elemento" (nó, ramo, etc.), "Conectar elementos", "Duplicar elemento", "Excluir elemento".
        *   **Ajustes Finos:** O usuário pode usar o painel de ferramentas para alterações estruturais/conteúdo via IA, ou as ferramentas do canvas para ajustes manuais.

---

**Fase 4: Finalização e Gerenciamento**

1.  **Exportação e Compartilhamento:** (Similar à versão anterior, com opções de exportar em PNG, SVG ou compartilhar um link).
2.  **Galeria de Documentos (`/app/documents`):** (Similar à versão anterior, servindo como portfólio de todas as apresentações criadas).