# Plano de Implementação: [FEATURE]

**Branch**: `[###-feature-name]` | **Data**: [DATE] | **Spec**: [link]

**Entrada**: Especificação da feature de `/specs/[###-feature-name]/spec.md`

**Nota**: Este template é preenchido pelo comando `/speckit.plan`. Veja `.specify/templates/plan-template.md` para o fluxo de execução.

## Resumo

Uma plataforma web para descobrir academias de jiu-jitsu brasileiro e outras artes marciais perto do usuário. O frontend busca as academias em um backend Supabase existente através da localização em texto (cidade/bairro) ou por geolocalização, filtra por modalidade de arte marcial, exibe os resultados em uma lista e em um mapa interativo, e mostra informações detalhadas das academias com direções de como chegar. O aplicativo segue as melhores práticas do Vue 3 usando Composition API, TypeScript, e Tailwind CSS.

## Contexto Técnico

<!--
  AÇÃO OBRIGATÓRIA: Substitua o conteúdo desta seção com os detalhes técnicos
  do projeto. A estrutura aqui é apresentada como orientação para o
  processo de iteração.
-->

**Linguagem/Versão**: Vue 3.3 + TypeScript 5.0

**Dependências Principais**: Vue Router 4.0, Supabase JS Client 2.0, Leaflet 1.9, Tailwind CSS 3.0

**Armazenamento**: Supabase PostgreSQL (backend existente, sem necessidade de storage no frontend)

**Testes**: Vitest (recomendado para Vue 3 + Vite)

**Plataforma Alvo**: Navegadores web modernos (Chrome, Firefox, Safari, Edge)

**Tipo do Projeto**: Aplicação web de página única (SPA)

**Metas de Performance**: Carregamento inicial em menos de 3 segundos, resultados de busca em menos de 1 segundo, interações suaves no mapa

**Restrições**: Deve usar a API do backend Supabase existente, UI em Português do Brasil, sem server-side rendering

**Escala/Escopo**: Projetado para centenas de academias, dezenas de usuários concorrentes

## Checagem da Constituição

*PORTÃO: Deve passar antes da Fase 0 (pesquisa). Checar novamente após o design na Fase 1.*

- [x] Simplicidade e Legibilidade: Código deve ser simples e legível, evitando otimizações prematuras
- [x] Responsabilidade Única dos Componentes Vue: Cada componente deve ter uma única responsabilidade bem definida
- [x] Preservação de Layout e Estilos: Nunca alterar layout ou estilos sem instrução explícita
- [x] Funcionalidades Apenas conforme Especificado: Nunca inventar funcionalidades não descritas nos requisitos
- [x] Uso Obrigatório da Composition API: Sempre usar Composition API com <script setup> em todos os componentes Vue
- [x] TypeScript em Todo o Código: TypeScript obrigatório em todos os arquivos .ts e .vue
- [x] Variáveis de Ambiente Seguras: Variáveis de ambiente devem ser acessadas apenas via VITE_ e nunca expostas diretamente no código
- [x] Commits Atômicos por Funcionalidade: Fazer commits atômicos contendo apenas uma única alteração lógica relacionada a uma funcionalidade específica

## Estrutura do Projeto

### Documentação (desta feature)

```text
specs/[###-feature]/
├── plan.md              # Este arquivo (output do comando /speckit.plan)
├── research.md          # Output da Fase 0 (comando /speckit.plan)
├── data-model.md        # Output da Fase 1 (comando /speckit.plan)
├── quickstart.md        # Output da Fase 1 (comando /speckit.plan)
├── contracts/           # Output da Fase 1 (comando /speckit.plan)
└── tasks.md             # Output da Fase 2 (comando /speckit.tasks - NÃO criado pelo /speckit.plan)
```

### Código Fonte (raiz do repositório)
<!--
  AÇÃO OBRIGATÓRIA: Substitua a árvore provisória abaixo pela estrutura concreta
  para esta feature. Delete as opções que não for utilizar e expanda a estrutura 
  escolhida com caminhos reais (ex: apps/admin, packages/something). O plano 
  entregue não deve incluir os rótulos de Opção.
-->

```text
src/
├── views/
│   ├── HomeView.vue
│   ├── ResultsView.vue
│   └── AcademyDetailView.vue
├── components/
│   ├── AcademyCard.vue
│   ├── MapView.vue
│   ├── SearchBar.vue
│   ├── ModalityChips.vue
│   ├── AcademyPopup.vue
│   ├── EmptyState.vue
│   └── LoadingSpinner.vue
├── composables/
│   ├── useAcademias.ts
│   ├── useGeolocation.ts
│   └── useMap.ts
├── lib/
│   └── supabase.ts
├── types/
│   └── academia.ts
├── router/
│   └── index.ts
└── assets/
    └── main.css
```

**Decisão de Estrutura**: Opção 2 adaptada: SPA Vue 3 com Vite. Sem backend próprio — 
apenas frontend consultando Supabase diretamente via client JS.

## Acompanhamento da Complexidade

