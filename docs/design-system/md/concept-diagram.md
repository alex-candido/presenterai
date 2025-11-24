# Conceptual Diagram

Este diagrama descreve as entidades principais do sistema e como elas se relacionam no banco de dados.

### Abstração do Fluxo do Usuário

No fluxo da aplicação, o conceito de `Document` é abstraído da interface do usuário. O usuário inicia sua jornada em um chat (`/app`), que nos bastidores cria um `Document` para armazenar o prompt. Em seguida, o usuário navega por `Generation` (`/app/generate/[id]`) e `Presentation` (`/app/presentation/[id]`) como etapas de um fluxo linear, sem gerenciar o `Document` que as agrupa.

### Entidades e Associações

*   **Entidades:**
    *   `User`: O usuário do sistema.
    *   `Document`: **(Conceito Interno)** A fonte de conteúdo (prompt, texto) que agrupa um ciclo de geração.
    *   `Generation`: O resultado de uma geração, contendo o "outline" (esboço) estruturado de um conteúdo visual, que pode ser tanto `MULTI_PAGE` (uma apresentação) quanto `SINGLE_PAGE` (um diagrama).
    *   `Presentation`: O conteúdo visual final (com um ou mais slides/páginas), gerado a partir de um `Generation`.

*   **Associações (Banco de Dados):**
    *   **User <-> Document (one-to-many):** Um `User` pode criar vários `Document`s.
    *   **Document <-> Generation (one-to-many):** A partir de um `Document`, podem ser feitas várias `Generation`s (tentativas de gerar um outline).
    *   **Generation <-> Presentation (one-to-many):** A partir de uma `Generation` (um outline específico), podem ser criadas múltiplas `Presentation`s (versões visuais).
