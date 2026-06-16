# Guia de Implementação: Orquestração de IA com Mastra

Este documento é o guia técnico para a implementação da lógica de IA no `presenterai` usando a biblioteca Mastra. Ele detalha os `workflows`, `agents`, `tools`, e `scorers`, e como eles se conectam com a API da aplicação e os schemas de dados.

## Estratégia: Dois Workflows Especializados

O processo de geração de conteúdo é dividido em duas etapas principais, cada uma gerenciada por um **Workflow** Mastra dedicado. Essa abordagem garante flexibilidade, controle e alta qualidade.

---

## Workflow 1: Geração do Outline (Estrutura)

Este workflow transforma a ideia abstrata do usuário em um esqueleto de conteúdo estruturado.

- **API Trigger**: `POST /api/v1/app/generations`
- **Arquivo do Workflow**: `src/lib/mastra/workflows/outline-workflow.ts`

### Entradas (Inputs)

O workflow é acionado com um objeto que corresponde ao `appCreateGenerationSchema` de `src/schemas/app/generation-schema.ts`:

```typescript
// z.infer<typeof appCreateGenerationSchema>
{
  userId: string, // UUID do usuário
  prompt: string, // Mínimo de 10 caracteres
  scope?: 'MULTI_PAGE' | 'SINGLE_PAGE',
  language?: 'PORTUGUESE' | 'ENGLISH' | 'SPANISH', // Exemplo de enum LanguageType
  quantity?: number, // int, positivo
}
```

### Componentes Mastra

1.  **`workflows/outline-workflow.ts`**:
    - **Responsabilidade**: Orquestrar a geração do `outline`.
    - **Processo**:
      1.  Recebe a entrada (`appCreateGenerationSchema`).
      2.  Invoca o `outline-agent` com o `prompt` e os parâmetros.
      3.  Força o agente a usar o `outline-tool` para formatar sua saída.
      4.  (Futuro) Pode invocar o `outline-scorer` para avaliar a qualidade.
      5.  Retorna um array de `Outline` que corresponde ao `outlinesSchema`.

2.  **`agents/outline-agent.ts`**:
    - **Responsabilidade**: O cérebro da operação. Converte o prompt do usuário em uma estrutura JSON.
    - **Instruções**: Deve ser instruído a entender a intenção do usuário (apresentação vs. diagrama), a criar uma sequência lógica de títulos, e a preencher todos os campos do `outlineSchema` para cada item.
    - **Ferramenta Obrigatória**: `outline-tool`.

3.  **`tools/outline-tool.ts`**:
    - **Responsabilidade**: Garantir a integridade estrutural da saída do `outline-agent`.
    - **Implementação**: Um `MastraTool` construído a partir do `outlinesSchema` (um array de `outlineSchema`) de `src/schemas/app/generation-schema.ts`. Isso força o agente a retornar um JSON estritamente tipado.

4.  **`scorers/outline-scorer.ts`**:
    - **Responsabilidade**: (Placeholder) Avaliar a qualidade do `outline` gerado.

### Saída (Output)

O workflow retorna um array de objetos `Outline`, que corresponde ao `outlinesSchema`.

```typescript
// z.infer<typeof outlinesSchema>
[
  {
    id: string, // uuid
    order: string,
    title: string,
    subtitle: string,
    description: string,
    representation: string,
    concepts: string[],
  }
]
```

**Exemplo Prático de Saída:**

```json
[
  {
    "id": "c7a8b9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
    "order": "1",
    "title": "Introdução: O Momento Perfeito para Micro-SaaS",
    "subtitle": "Fatores tecnológicos, econômicos e sociais que favorecem o crescimento de startups de software",
    "description": "Por que 2025 oferece condições ideais e como identificar o modelo certo ",
    "representation": "CONVERGÊNCIA (Fatores tecnológicos + econômicos + sociais)",
    "concepts": [
      "API-Economy",
      "No-Code-Infrastructure",
      "AI-Augmented-Development",
      "Cauda-Longa-Digital",
      "Building-in-Public"
    ]
  }
]
```

---

## Workflow 2: Geração do Slide (Visual)

Este workflow é um especialista visual. Ele é executado para **cada slide individualmente** e sua função é "desenhar", convertendo os dados estruturados do `outline` em um formato visual Excalidraw.

- **API Trigger**: `PATCH /api/v1/app/generations/[id]`
- **Arquivo do Workflow**: `src/lib/mastra/workflows/slide-workflow.ts`

### Entradas (Inputs)

O workflow é acionado com um objeto que combina um item do `outline` com os parâmetros de customização do `appUpdateGenerationSchema` de `src/schemas/app/generation-schema.ts`.

```typescript
// Combinação de z.infer<typeof outlineSchema> e z.infer<typeof appUpdateGenerationSchema>
{
  // Do Outline
  id: string, // uuid
  order: string,
  title: string,
  subtitle: string,
  description: string,
  representation: string,
  concepts: string[],

  // Do Schema de Update
  aspectRatio?: string, // "16:9"
  keywords?: string[],
}
```

### Componentes Mastra

1.  **`workflows/slide-workflow.ts`**:
    - **Responsabilidade**: Orquestrar a geração do conteúdo visual de um **único slide**.
    - **Processo**:
      1.  Recebe um item do `outline` e os parâmetros de estilo.
      2.  Invoca o `slide-agent` com todas essas informações.
      3.  Força o agente a usar o `slide-tool` para validar a saída.
      4.  (Futuro) Pode invocar o `slide-scorer`.
      5.  Retorna o array de `ExcalidrawElement`.

2.  **`agents/slide-agent.ts`**:
    - **Responsabilidade**: Especialista na estrutura Excalidraw. Converte os dados e o contexto de estilo em um array de elementos visuais.
    - **Instruções**: Deve ser instruído sobre como calcular posições, dimensões, cores e estilos para realizar o layout solicitado (`representation`). Precisa saber como criar `rectangle`, `text`, `arrow`, etc., e como vincular textos a formas usando `containerId`.
    - **Ferramenta Obrigatória**: `slide-tool`.

3.  **`tools/slide-tool.ts`**:
    - **Responsabilidade**: Garantir que o `slide-agent` produza um JSON de elementos Excalidraw válido.
    - **Implementação**: Um `MastraTool` construído a partir de um array do `excalidrawElementSchema` de `src/schemas/app/excalidraw-schema.ts`.

4.  **`scorers/slide-scorer.ts`**:
    - **Responsabilidade**: (Placeholder) Avaliar a qualidade do slide gerado (ex: apelo visual, clareza).

### Saída (Output)

O workflow retorna um array de objetos `ExcalidrawElement`, que corresponde a `ExcalidrawElement[]`.

```typescript
// z.infer<typeof excalidrawElementSchema>[]
[
  {
    // Propriedades base
    "id": string,
    "type": "rectangle" | "ellipse" | "text" | "arrow" | ...,
    "x": number,
    "y": number,
    "width": number,
    "height": number,
    "strokeColor": string,
    "backgroundColor": string,
    // ... e muitas outras propriedades

    // Propriedades específicas do tipo (ex: para "text")
    "text": string,
    "fontSize": number,
    "fontFamily": 1 | 2 | 3 | 4,
    "textAlign": "left" | "center" | "right",
    "verticalAlign": "top" | "middle" | "bottom",
    "containerId"?: string | null
  }
]
```

**Exemplo Prático de Saída (fragmento para um slide simples):**

```json
[
  {
    "id": "rect_title_1",
    "type": "rectangle",
    "x": 40,
    "y": 20,
    "width": 720,
    "height": 80,
    "strokeColor": "#000000",
    "backgroundColor": "#ca8a04",
    "fillStyle": "solid",
    "strokeWidth": 2,
    "strokeStyle": "solid",
    "roughness": 0,
    "opacity": 100,
    "angle": 0,
    "seed": 12345,
    "version": 1,
    "versionNonce": 67890
  },
  {
    "id": "text_title_1",
    "type": "text",
    "x": 50,
    "y": 35,
    "width": 700,
    "height": 50,
    "text": "Título do Slide Gerado pela IA",
    "fontSize": 32,
    "fontFamily": 2,
    "textAlign": "center",
    "verticalAlign": "middle",
    "containerId": "rect_title_1",
    "strokeColor": "#FFFFFF",
    "backgroundColor": "transparent",
    "fillStyle": "solid",
    "strokeWidth": 1,
    "strokeStyle": "solid",
    "roughness": 0,
    "opacity": 100,
    "angle": 0,
    "seed": 54321,
    "version": 1,
    "versionNonce": 98765
  }
]
```
