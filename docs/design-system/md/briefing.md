### **Project Briefing: presenterai**

**Project Title:**
presenterai (um Micro-SaaS)

**Core Objective:**
Capacitar usuários a criar uma vasta gama de conteúdos visuais—desde apresentações completas e visualmente impactantes, até diagramas complexos de página única (como fluxogramas e mapas mentais)—no formato Excalidraw, de forma rápida e inteligente. O foco é transformar um simples prompt ou um conteúdo bruto em uma estrutura customizável, minimizando o esforço manual.

**Description:**
`presenterai` é uma ferramenta de IA que reinventa o processo de criação de apresentações. Em vez de começar com uma tela em branco, o usuário fornece um tema ou conteúdo inicial. A IA então propõe um **esboço (outline)** da estrutura do conteúdo, que pode ser uma sequência de slides, um fluxograma, um mapa mental ou outro tipo de visual. Este esboço é totalmente editável, permitindo que o usuário refine a narrativa ou a lógica estrutural. Para cada item no esboço (seja um slide, um nó de diagrama ou um tópico de mapa mental), o usuário pode definir parâmetros cruciais como o **tipo de layout visual** (ex: comparação, linha do tempo, processo), a **profundidade do conteúdo** (de conciso a extenso) e palavras-chave para guiar a IA. Após a aprovação do esboço, a IA gera o conteúdo visual completo no formato Excalidraw, entregando um resultado pronto dentro de um ambiente de edição intuitivo.

**Target Audience:**
Profissionais, educadores, estudantes, palestrantes e qualquer pessoa que precise criar apresentações de forma ágil, mas que não queira sacrificar a qualidade visual ou a estrutura da narrativa.
**User Flow:**

1.  **Ponto de Partida (Chat):** O usuário acessa `/app` e se depara com uma interface de chat, pronta para receber um prompt. Este é o ponto de partida para qualquer nova apresentação.
2.  **Geração do Outline:** Ao submeter um prompt, o sistema processa a ideia e redireciona o usuário para `/app/generate/[generateId]`.
3.  **Edição do Outline:** Nesta página, o usuário visualiza o esboço (outline) slide a slide proposto pela IA. Ele pode editar títulos, reordenar slides e ajustar parâmetros como layout e profundidade para cada um.
4.  **Criação da Apresentação:** Com o outline refinado, o usuário clica em "Criar Apresentação". O sistema gera a versão visual e o redireciona para `/app/presentation/[presentationId]`.
5.  **Workspace e Edição Final:** O usuário aterrissa no workspace da apresentação, onde pode fazer ajustes finos diretamente nos slides (formato Excalidraw).
6.  **Galeria de Apresentações:** A qualquer momento, o usuário pode acessar `/app/documents` para ver uma galeria com todas as suas apresentações finalizadas.

**Key Features**

*   **Geração de Conteúdo Versátil:** Inicie a criação de uma apresentação multi-slide, um fluxograma, um mapa mental, ou outros diagramas a partir de um simples prompt de texto ou colando um conteúdo/artigo existente.
*   **Outline Inteligente e Flexível:** A IA gera um esboço estrutural (em JSON) que se adapta ao tipo de conteúdo. Para apresentações, é uma lista de slides. Para diagramas, descreve os elementos e suas conexões.
*   **Esboço 100% Editável:** Total controle para adicionar, remover, reordenar e editar a estrutura proposta pela IA antes da geração visual, otimizando o resultado e o uso de tokens.
*   **Customização Detalhada:** Capacidade de ajustar cada parte do outline individualmente (ex: o layout de um slide, o formato de um nó em um diagrama), definindo:
    *   O **layout visual** (ex: Comparação, Linha do Tempo).
    *   A **profundidade do conteúdo** (ex: Conciso, Detalhado).
    *   **Palavras-chave** para focar o tópico.
*   **Geração para Excalidraw:** Converte o esboço customizado em um conteúdo visual completo e rico, renderizado no formato Excalidraw.
*   **Ambiente de Edição Integrado:** Um editor que combina a navegação pela estrutura do conteúdo com um canvas Excalidraw para ajustes finos e edições manuais.

**Conceptual Diagram:**

*   **Entidades:** `User`, `Document`, `Generation`, `Presentation`.
*   **Associações:**
    *   **User <-> Document (1-para-Muitos):** Um usuário pode ter múltiplos documentos (projetos).
    *   **Document <-> Generation (1-para-Muitos):** Um documento pode ter um histórico de múltiplas tentativas de geração (prompts e outlines).
    *   **Generation <-> Presentation (1-para-Muitos):** A partir de um outline, o usuário pode gerar múltiplas versões visuais (apresentações).

**Application Route Structure**

A estrutura de rotas do `presenterai` é organizada em grupos para modularizar as diferentes áreas da aplicação. Cada grupo de rotas (`(group)`) representa um contexto específico, como autenticação, a aplicação principal, o painel de administração, etc.

*   `(home)`: **Página Inicial e de Marketing**
    *   `/`: A landing page principal do projeto, com informações sobre o produto, features e call-to-actions (CTAs) para inscrição ou login.

*   `(auth)`: **Fluxos de Autenticação**
    *   `/auth/sign-in`: Página de login para usuários existentes.
    *   `/auth/sign-up`: Página de cadastro para novos usuários.
    *   `/auth/forgot-password`: Fluxo para recuperação de senha.
    *   `/auth/reset-password`: Página para definir uma nova senha após a recuperação.

*   `(app)`: **O Coração do Produto**
    *   `/app`: **Ponto de Partida (Chat)**. Interface principal para o usuário inserir um prompt e iniciar a criação de uma nova apresentação.
    *   `/app/generate/[generateId]`: **Editor de Outline**. Página dedicada a editar e refinar o esboço (outline) de uma apresentação específica.
    *   `/app/presentation/[presentationId]`: **Workspace da Apresentação**. Ambiente final de edição e visualização da apresentação.
    *   `/app/documents`: **Galeria de Apresentações**. Exibe uma lista de todas as apresentações finalizadas pelo usuário.

*   `(admin)`: **Painel de Administração**
    *   `/admin/dashboard`: Visão geral com estatísticas de uso, novos usuários e atividades recentes.
    *   `/admin/users`: Gerenciamento de usuários da plataforma.
    *   `/admin/documents`: Visualização e gerenciamento de todos os documentos criados.
    *   `/admin/generations`: Acesso a todas as gerações de outlines.
    *   `/admin/presentations`: Acesso a todas as apresentações finais geradas.

*   `(docs)`: **Documentação do Produto**
    *   `/docs`: Hub central para a documentação, tutoriais e guias de uso da ferramenta.

*   `(terms)`: **Páginas Legais**
    *   `/terms`: Página para os Termos de Serviço e Política de Privacidade.


**Tech Stack**

*   **Next.js 15:** Framework React full-stack para construir tanto o frontend (interface do usuário) quanto o backend (API).
*   **Next-Auth:** Solução de autenticação para gerenciar o login de usuários.
*   **Prisma:** ORM (Object-Relational Mapper) para facilitar o acesso e a manipulação do nosso banco de dados.
*   **TypeScript:** Linguagem principal, adicionando tipagem estática para maior robustez e manutenibilidade.
*   **ESLint:** Ferramenta para analisar o código, encontrar e corrigir problemas, garantindo a consistência.
*   **Zod:** Biblioteca para declaração e validação de schemas, garantindo a integridade dos dados que entram na API e saem do banco de dados.
*   **Radix UI / shadcn/ui:** Base da interface, fornecendo componentes acessíveis e reutilizáveis.
*   **Tailwind CSS:** Framework de CSS utility-first para estilização rápida.
*   **Lucide React:** Biblioteca de ícones SVG, leve e customizável, para a iconografia da interface.
*   **React Query (TanStack Query):** Biblioteca para data-fetching, caching e gerenciamento de estado assíncrono.
*   **Axios:** Cliente HTTP para fazer requisições do frontend para a API.
*   **Google Generative AI:** Motor de IA (modelo `gemini-2.5-flash`) para classificação e geração de conteúdo.
*   **Mastra:** Biblioteca interna para orquestração de agentes de IA, gerenciando workflows, ferramentas e prompts.
