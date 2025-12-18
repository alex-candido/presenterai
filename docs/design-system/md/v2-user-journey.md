### **User Journey Detalhado: Da Ideia à Apresentação Final (v2)**

Este documento detalha a jornada completa do usuário no `presenterai`, mapeando o fluxo de criação com as rotas da aplicação, os componentes de UI, as entidades de dados e os requisitos de cada etapa.

**Personas:**
*   **Ana, a Consultora:** Focada em eficiência e customização para clientes.
*   **Carlos, o Estudante:** Focado em estruturação de conteúdo acadêmico.

---

### **Fase 1: Ideia e Configuração Inicial**

O ponto de partida da criação, onde a ideia do usuário começa a tomar forma.

*   **Rota:** `/app/start`
*   **Arquivo:** `src/app/(app)/app/(routes)/start/page.tsx`
*   **Entidade Principal:** `Document`. Um novo registro de `Document` é iniciado para abrigar o prompt e as configurações, servindo como a "fonte de verdade" para todo o ciclo de geração.
*   **Componentes Principais:**
    *   `app-hero.tsx`: Seção de boas-vindas e título principal.
    *   `app-form.tsx`: O componente principal que encapsula a entrada do prompt.
    *   `app-form-controls.tsx`: Componente que encapsula a seleção de modo (`MULTI_PAGE` vs. `SINGLE_PAGE`) e outras configurações gerais, incluindo botões de ação como "Gerar".
    *   `app-suggestions-section.tsx`: Exibe sugestões de prompts para o usuário.
    *   `app-recents-section.tsx`: Exibe os documentos criados recentemente para acesso rápido.
*   **Requisitos Funcionais:**
    *   O usuário deve poder selecionar o escopo do conteúdo (Apresentação ou Visual Único).
    *   O usuário deve poder inserir um prompt de texto.
    *   O usuário deve poder configurar opções globais (idioma, quantidade de slides).
    *   O usuário deve poder ver uma lista de suas criações recentes.
    *   Ao submeter, o sistema deve criar um `Document` e uma primeira `Generation`, redirecionando para a Fase 2.
*   **Requisitos Não Funcionais:**
    *   A página deve carregar em menos de 2 segundos.
    *   A interface deve ser intuitiva e responsiva em dispositivos móveis e desktop.
    *   O feedback visual deve ser imediato ao interagir com os controles do formulário.

---

### **Fase 2: Refinamento da Estrutura (O Editor de Outline)**

Nesta fase crítica, o usuário colabora com a IA para refinar a estrutura lógica do conteúdo antes da geração visual.

*   **Rota:** `/app/generate/[id]` (onde `[id]` é o `uuid` da `Generation`)
*   **Arquivo:** `src/app/(app)/app/(routes)/generate/[id]/page.tsx`
*   **Entidade Principal:** `Generation`. O usuário interage e modifica o campo `outline` (um JSON) do registro de `Generation` associado ao `Document`.
*   **Componentes Principais:**
    *   `app-generate-header.tsx`: Cabeçalho da página, com o título do documento e ações principais como "Criar Visual".
    *   `app-generate-outline-panel.tsx`: O painel principal (geralmente à esquerda ou no centro) que exibe a estrutura do outline (lista de slides ou elementos de um diagrama) de forma editável e reordenável.
    *   `app-generate-settings-panel.tsx`: O painel de contexto (geralmente à direita) onde o usuário customiza o item selecionado no outline (título, layout, profundidade, palavras-chave).
*   **Requisitos Funcionais:**
    *   O usuário deve poder editar os títulos de cada item do outline.
    *   O usuário deve poder reordenar os itens (slides/elementos) via arrastar e soltar (drag-and-drop).
    *   O usuário deve poder alterar o "Tipo de Layout", a "Profundidade do Conteúdo" e as "Palavras-chave" de cada item individualmente.
    *   O usuário deve poder adicionar ou remover itens do outline.
    *   As alterações no outline devem ser salvas automaticamente (debounced) ou através de uma ação explícita.
*   **Requisitos Não Funcionais:**
    *   A interface deve refletir as mudanças no outline em tempo real, sem a necessidade de recarregar a página.
    *   A performance da interface de arrastar e soltar deve ser fluida.
    *   O salvamento automático não deve impactar a performance da digitação do usuário.

---

### **Fase 3: Edição Visual (O Workspace)**

O usuário recebe o conteúdo visualmente renderizado e pode fazer ajustes finos, combinando a precisão do controle manual com o poder de regeneração da IA.

*   **Rota:** `/app/presentations/[id]` (onde `[id]` é o `uuid` da `Presentation`)
*   **Arquivo:** `src/app/(app)/app/(routes)/presentations/[id]/page.tsx`
*   **Entidade Principal:** `Presentation`. O usuário edita o campo `content`, que armazena os dados da cena Excalidraw no formato JSON.
*   **Componentes Principais:**
    *   `app-presentations-header.tsx`: Cabeçalho do workspace com o título da apresentação e ações de alto nível (Exportar, Compartilhar).
    *   `app-presentations-sidebar.tsx`: A barra lateral de navegação. Para `MULTI_PAGE`, exibe a lista de miniaturas dos slides. Para `SINGLE_PAGE`, é minimizada ou exibe uma visão geral.
    *   `app-presentations-workspace.tsx`: O componente central que renderiza o canvas do Excalidraw para edição direta.
    *   `app-presentations-tools.tsx`: O painel de ferramentas de conteúdo (geralmente à direita) com ações de IA para regenerar o slide/visual, alterar layout, etc.
*   **Requisitos Funcionais:**
    *   O usuário deve poder manipular todos os elementos no canvas do Excalidraw (mover, redimensionar, desenhar, etc.).
    *   Para `MULTI_PAGE`, o usuário deve poder navegar entre os slides e reordená-los.
    *   O usuário deve poder usar ações de IA para regenerar o conteúdo do slide/visual ativo.
    *   As alterações feitas no canvas devem ser salvas periodicamente de forma automática.
*   **Requisitos Não Funcionais:**
    *   A performance do canvas Excalidraw deve ser extremamente rápida e responsiva, mesmo com muitos elementos.
    *   O tempo de salvamento automático deve ser otimizado para não interromper o fluxo do usuário.
    *   A aplicação deve garantir a integridade dos dados (evitar perda de trabalho).

---

### **Fase 4: Finalização e Gerenciamento**

Após a criação, o usuário precisa de um local para ver, organizar e acessar seus trabalhos concluídos.

*   **Rota:** `/app/documents`
*   **Arquivo:** `src/app/(app)/app/(routes)/documents/page.tsx`
*   **Entidade Principal:** `Document` e `Presentation`. A página lista os `Documents` criados pelo usuário, geralmente exibindo informações da `Presentation` mais recente associada a cada um.
*   **Componentes Principais:**
    *   `app-documents-header.tsx`: Cabeçalho da página da galeria.
    *   `app-documents-toolbar.tsx`: Barra de ferramentas com opções de filtro, ordenação e busca.
    *   `app-documents-list.tsx`: A grade ou lista que renderiza os itens da galeria.
    *   `app-documents-item.tsx`: O card individual que representa um documento/apresentação na galeria, com ações rápidas (abrir, renomear, excluir).
*   **Requisitos Funcionais:**
    *   O usuário deve ver uma lista de todos os seus documentos criados.
    *   O usuário deve poder buscar, filtrar e ordenar seus documentos.
    *   O usuário deve poder realizar ações em cada documento (abrir no workspace, renomear, duplicar, excluir).
*   **Requisitos Não Funcionais:**
    *   A galeria deve carregar rapidamente, mesmo com um grande número de documentos (implementar paginação ou carregamento infinito).
    *   A busca e a filtragem devem ser performáticas e retornar resultados em tempo real.
    *   As ações devem fornecer feedback visual claro (ex: modal de confirmação para exclusão).
