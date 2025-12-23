# Orquestração de IA com Mastra no `presenterai`

Este documento detalha o plano de implementação da lógica de IA no `presenterai` usando a biblioteca Mastra. A abordagem se baseia em um workflow de múltiplos agentes, inspirado pelas lições aprendidas em exemplos como o `whiteboard-to-excalidraw-converter` e fundamentado no fluxo de dados real da aplicação.

## A Estratégia: Dois Agentes Especializados em um Fluxo de 2 Passos

Para garantir flexibilidade, controle e alta qualidade, o processo de geração de conteúdo é dividido em duas chamadas de API distintas, cada uma acionando um agente Mastra especializado.

### Fluxo Geral

1.  **`POST /api/v1/app/generations`**: O usuário envia um `prompt` inicial e parâmetros globais. O **Agente 1** é acionado no backend.
2.  **Agente 1 (Estruturador de Conteúdo)**: Processa a entrada e gera a primeira versão do **`outline` JSON** (nosso formato intermediário), que é salva no banco de dados.
3.  **Customização do Usuário**: O frontend recebe o `outline`. O usuário revisa, edita e anota cada item do `outline`.
4.  **`PATCH /api/v1/app/generations/[id]`**: O frontend envia o `outline` modificado junto com um rico conjunto de **Parâmetros de Estilo e Contexto**. O **Agente 2** é acionado no backend.
5.  **Agente 2 (Designer Visual)**: Processa cada item do `outline` customizado, usando os parâmetros de estilo, e gera o **JSON do Excalidraw**.
6.  **Finalização**: O JSON final é montado e apresentado ao usuário no workspace de edição.

---

### Agente 1: O Estruturador de Conteúdo (Outline Generator)

Este agente é responsável por transformar a ideia abstrata do usuário em um esqueleto estruturado para o conteúdo.

*   **Responsabilidade**: Converter o prompt e os parâmetros globais em um `outline` no formato JSON.
*   **Gatilho da API**: `POST /api/v1/app/generations`

#### Entradas (Inputs)
Baseado em `appCreateGenerationSchema`:
*   `prompt` (string): A ideia principal do usuário (ex: "Apresentação sobre a história do café").
*   `scope` (enum, opcional): `MULTI_PAGE` ou `SINGLE_PAGE`.
*   `language` (enum, opcional): Idioma do conteúdo a ser gerado.
*   `quantity` (number, opcional): Número de slides/elementos a serem gerados.

#### Saída (Output)
Um array JSON (`outlines`) onde cada objeto segue a `outlineSchema`:

**Exemplo de Saída (`outlines`):**
```json
[
  {
    "id": "c7a8b9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
    "order": "1",
    "title": "A Descoberta do Café",
    "subtitle": "A Lenda de Kaldi",
    "description": "Uma breve descrição gerada pela IA sobre a descoberta do café.",
    "representation": "TITLE_AND_BODY",
    "concepts": ["lenda", "pastor", "cabras"]
  }
]
```

---

### Agente 2: O Designer Visual (Slide Content Generator)

Este agente é um especialista na estrutura do Excalidraw. Sua única função é "desenhar", convertendo os dados de um único slide em um formato visual.

*   **Responsabilidade**: Converter um item do `outline` e seus parâmetros de contexto em um array de elementos JSON do Excalidraw.
*   **Gatilho da API**: `PATCH /api/v1/app/generations/[id]`

#### Entradas (Inputs)
O corpo da requisição contém todos os dados necessários para o agente:
1.  **O `outline` atualizado**: Um objeto do array `outlines` (com `id`, `title`, `description`, `representation`, etc.).
2.  **Parâmetros de Estilo e Contexto** (baseado em `appUpdateGenerationSchema`):
    *   `tone`: `FORMAL`, `INFORMAL`, etc.
    *   `amount`: `CONCISE`, `DETAILED`, etc.
    *   `audience`: `STUDENTS`, `PROFESSIONALS`, etc.
    *   `scenario`: `BUSINESS_PITCH`, `EDUCATIONAL_LECTURE`, etc.
    *   `theme`: `LIGHT`, `DARK`, `CREATIVE`, etc.
    *   `aspectRatio`: `RATIO_16_9`, `RATIO_4_3`, etc.
    *   `keywords`: `["remote work", "productivity"]`

#### Saída (Output)
Um array de objetos de elementos Excalidraw. O agente não precisa gerar o JSON completo da cena, apenas o conteúdo do array `elements`.

**Exemplo de Saída (fragmento do array `elements` para um slide simples):**
```json
[
  {
    "id": "rect_title_1",
    "type": "rectangle",
    "x": 10,
    "y": 10,
    "width": 800,
    "height": 50,
    "backgroundColor": "#ca8a04",
    ...
  },
  {
    "id": "text_title_1",
    "type": "text",
    "x": 20,
    "y": 20,
    "width": 780,
    "height": 30,
    "containerId": "rect_title_1",
    "text": "Título do Slide Gerado pela IA",
    "fontSize": 24,
    ...
  }
]
```
O agente será instruído a calcular as posições (`x`, `y`) e dimensões (`width`, `height`) para realizar o layout solicitado (`representation`), e a vincular textos a formas usando o `containerId`.
