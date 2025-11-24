> **Nota:** Este diagrama representa a estrutura interna do banco de dados. O fluxo da aplicação para o usuário final é mais linear (`/app` -> `/app/generate` -> `/app/presentation`) e abstrai o conceito de `Document`, que funciona como um agrupador interno.

```dbml
Enum Status {
  ACTIVE
  INACTIVE
}

Enum PresentationStyle {
  PROFESSIONAL
  CREATIVE
  MINIMALIST
}

Enum GenerationScope {
  MULTI_PAGE  // For content with multiple slides/pages
  SINGLE_PAGE // For a single, isolated visual
}

Enum UserRole {
  ADMIN
  MEMBER
}

Enum Visibility {
  PUBLIC
  PRIVATE
}

Table User {
  id               integer      [primary key]
  uuid             string       [unique]
  username         string       [unique]
  email            string       [unique]
  password_hash    string
  role             UserRole     [not null, default: "MEMBER"]
  status           Status       [default: "ACTIVE"]
  created_at       timestamp
  updated_at       timestamp
}

Table Document {
  id                       integer      [primary key]
  uuid                     string       [unique]
  user_id                  integer      [ref: > User.id, not null]
  title                    string       [not null]
  visibility               Visibility   [not null, default: "PRIVATE"]
  latest_generation_id     integer      [ref: > Generation.id, note: "Ponteiro para a última Generation. Pode ser nulo."]
  latest_presentation_id   integer      [ref: > Presentation.id, note: "Ponteiro para a última Presentation. Pode ser nulo."]
  status                   Status       [default: "ACTIVE"]
  created_at               timestamp
  updated_at       timestamp
}

Table Generation {
  id               integer      [primary key]
  uuid             string       [unique]
  document_id      integer      [ref: > Document.id, not null]
  scope            GenerationScope [not null, default: "MULTI_PAGE"]
  prompt           text         [not null, comment: "The specific user input/prompt for this generation"]
  outline          json         [not null, comment: "Logical structure. For MULTI_PAGE, it's an array of objects (slides). For SINGLE_PAGE, it's a single object. The 'layout' property within the JSON (e.g., 'FLOWCHART', 'COMPARISON') defines the visual representation."]
  ai_metadata      json         [comment: "Metadata from the AI agent run (e.g., token usage, model version)"]
  status           Status       [default: "ACTIVE"]
  created_at       timestamp
  updated_at       timestamp
}

Table Presentation {
  id               integer      [primary key]
  uuid             string       [unique]
  generation_id    integer      [ref: > Generation.id, not null]
  user_id          integer      [ref: > User.id, not null]
  title            string       [not null]
  content          json         [not null, comment: "Array of Excalidraw scene data. Will contain multiple items for MULTI_PAGE scope, and a single item for SINGLE_PAGE scope."]
  style            PresentationStyle [comment: "Overall style of the presentation"]
  language         string       [comment: "e.g., 'pt-BR', 'en-US'"]
  status           Status       [default: "ACTIVE"]
  created_at       timestamp
  updated_at       timestamp
}
```
