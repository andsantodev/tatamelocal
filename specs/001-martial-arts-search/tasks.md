---
description: "Task list template for feature implementation"
---

# Tarefas: Buscador de Academias de Artes Marciais TatameLocal

**Entrada**: Documentos de design de `/specs/001-martial-arts-search/`

**Pré-requisitos**: plan.md (obrigatório), spec.md (obrigatório para user stories), research.md, data-model.md, quickstart.md

**Testes**: Os exemplos abaixo incluem tarefas de teste. Testes são OPCIONAIS - inclua apenas se solicitado explicitamente na especificação da feature.

**Organização**: As tarefas são agrupadas por user story para permitir implementação e testes independentes de cada história.

## Formato: `[ID] [P?] [Story] Descrição`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[Story]**: A qual user story esta tarefa pertence (ex: US1, US2, US3)
- Inclua caminhos de arquivos exatos nas descrições

## Convenções de Caminho

- **Projeto único**: `src/`, `tests/` na raiz do repositório
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` ou `android/src/`
- Caminhos mostrados abaixo assumem projeto único - ajuste com base na estrutura do plan.md

<!--
    ============================================================================
    IMPORTANTE: As tarefas abaixo são TAREFAS DE EXEMPLO apenas para fins de ilustração.

    O comando /speckit.tasks DEVE substituir estas pelas tarefas reais com base em:
    - User stories do spec.md (com suas prioridades P1, P2, P3...)
    - Requisitos de feature do plan.md
    - Entidades do data-model.md
    - Endpoints de contracts/

    As tarefas DEVEM ser organizadas por user story para que cada história possa ser:
    - Implementada independentemente
    - Testada independentemente
    - Entregue como um incremento do MVP

    NÃO mantenha essas tarefas de exemplo no arquivo tasks.md gerado.
    ============================================================================
-->

## Fase 1: Setup (Infraestrutura Compartilhada)

**Propósito**: Inicialização do projeto e estrutura básica

- [x] T001 Criar estrutura do projeto de acordo com o plan.md
- [x] T002 Inicializar projeto Vue 3 com TypeScript e Vite
- [x] T004 [P] Configurar Tailwind CSS 3 com tema customizado (dark mode, paleta vermelho/marrom)
- [x] T005 [P] Configurar client do Supabase JS com variáveis de ambiente
- [x] T006 [P] Configurar Vue Router 4 com history mode
- [x] T007 [P] Configurar ambiente de testes Vitest

---

## Fase 2: Fundacional (Pré-requisitos Bloqueantes)

**Propósito**: Infraestrutura central que DEVE estar completa antes que QUALQUER user story possa ser implementada

**⚠️ CRÍTICO**: Nenhum trabalho de user story pode começar até que esta fase esteja completa

Exemplos de tarefas fundacionais (ajuste baseado no seu projeto):

- [x] T008 Configurar tipos e configuração do client Supabase
- [x] T009 [P] Criar camada base de serviço de API para acesso a dados das academias
- [x] T010 [P] Configurar inicialização do mapa Leaflet e configuração básica
- [x] T011 [P] Criar estilos base de componentes de UI compartilhados
- [x] T012 [P] Implementar componente de loading spinner (LoadingSpinner.vue)

**Ponto de checagem**: Fundação pronta - implementação de user stories já pode começar em paralelo

---

## Fase 3: User Story 1 - Buscar Academias por Localização e Modalidade (Prioridade: P1) 🎯 MVP

**Objetivo**: Permitir que usuários busquem academias de artes marciais por localização em texto ou geolocalização, filtrem por modalidades e vejam resultados nos formatos de lista e mapa

**Teste Independente**: Usuário consegue buscar academias usando input de texto ou geolocalização, aplicar filtros de modalidade, e ver resultados exibidos em formato de lista e visualização de mapa com ajuste correto de zoom

### Testes para User Story 1 (OPCIONAL - apenas se testes forem solicitados) ⚠️

> **NOTA: Escreva estes testes PRIMEIRO, garanta que eles FALHEM antes da implementação**

- [ ] T014 [P] [US1] Testar funcionalidade de busca por localização em texto
- [ ] T015 [P] [US1] Testar funcionalidade de busca por geolocalização
- [ ] T016 [P] [US1] Testar filtro de modalidades com lógica OR
- [ ] T017 [P] [US1] Testar exibição do loading spinner durante requisições de API
- [ ] T018 [P] [US1] Testar ajuste de zoom do mapa para mostrar todos os pins
- [ ] T019 [P] [US1] Testar que a funcionalidade de limpar busca reseta todos os filtros

### Implementação para User Story 1

- [x] T020 [P] [US1] Criar componente SearchBar.vue em src/components/
- [x] T021 [P] [US1] Criar componente ModalityChips.vue em src/components/
- [x] T022 [P] [US1] Criar componente AcademyCard.vue em src/components/
- [x] T023 [P] [US1] Criar componente MapView.vue em src/components/
- [x] T024 [P] [US1] Criar componente EmptyState.vue em src/components/
- [x] T025 [P] [US1] Implementar composable useAcademias em src/composables/useAcademias.ts
- [x] T026 [P] [US1] Implementar composable useGeolocation em src/composables/useGeolocation.ts
- [x] T027 [P] [US1] Implementar composable useMap em src/composables/useMap.ts
- [x] T028 [US1] Criar HomeView.vue em src/views/ com interface de busca
- [x] T029 [US1] Criar ResultsView.vue em src/views/ com painéis de lista e mapa
- [x] T030 [US1] Configurar rotas para / (Home) e /resultados (Results) em src/router/
- [x] T031 [US1] Implementar busca por localização em texto via consultas SELECT do Supabase
- [x] T032 [US1] Implementar busca por geolocalização via RPC search_by_location do Supabase
- [x] T033 [US1] Implementar filtro de modalidade com lógica OR
- [x] T034 [US1] Implementar funcionalidade de limpar busca
- [x] T035 [US1] Implementar zoom automático do mapa para exibir todos os pins
- [x] T036 [US1] Conectar componentes HomeView e ResultsView

**Ponto de checagem**: Neste ponto, a User Story 1 deve estar totalmente funcional e testável de forma independente

---

## Fase 4: User Story 2 - Visualizar Detalhes da Academia (Prioridade: P2)

**Objetivo**: Permitir que usuários cliquem em uma academia nos resultados da busca para visualizar informações detalhadas

**Teste Independente**: Usuário pode selecionar qualquer academia da lista de resultados de busca ou do mapa e ver informações completas, incluindo nome, endereço, modalidades, informações de contato, rating, horários e imagem de capa

### Testes para User Story 2 (OPCIONAL - apenas se testes forem solicitados) ⚠️

- [ ] T037 [P] [US2] Testar se a visão de detalhe da academia exibe todas as informações necessárias
- [ ] T038 [P] [US2] Testar navegação da lista de resultados para a visão de detalhe
- [ ] T039 [P] [US2] Testar navegação do pin no mapa para a visão de detalhe
- [ ] T040 [P] [US2] Testar se o botão "Como chegar" abre o Google Maps com o endereço correto

### Implementação para User Story 2

- [x] T041 [P] [US2] Criar componente AcademyPopup.vue em src/components/
- [x] T042 [P] [US2] Implementar função getBySlug no composable useAcademias
- [x] T043 [US2] Criar AcademyDetailView.vue em src/views/
- [x] T044 [US2] Configurar rota para /academia/:slug em src/router/
- [x] T045 [US2] Implementar chamada de API para obter academia por slug/ID
- [x] T046 [US2] Exibir detalhes da academia: nome, endereço, modalidades, telefone, WhatsApp, website, rating, horários, imagem de capa
- [x] T047 [US2] Implementar botão "Como chegar" que abre o Google Maps
- [x] T048 [US2] Conectar pins do mapa à navegação de detalhes da academia
- [x] T049 [US2] Conectar cards de academia à navegação de detalhes da academia

**Ponto de checagem**: Neste ponto, as User Stories 1 E 2 devem ambas funcionar independentemente

---

## Fase 5: User Story 3 - Obter Rotas para a Academia (Prioridade: P3)

**Objetivo**: Permitir que os usuários obtenham rotas para uma academia usando o Google Maps

**Teste Independente**: Usuário pode clicar no botão "Como chegar" na página de detalhes de qualquer academia e ter o Google Maps aberto com o endereço da academia preenchido como destino

### Testes para User Story 3 (OPCIONAL - apenas se testes forem solicitados) ⚠️

- [ ] T050 [P] [US3] Testar se o botão "Como chegar" gera a URL correta do Google Maps
- [ ] T051 [P] [US3] Testar se o Google Maps abre com o endereço da academia como destino
- [ ] T052 [P] [US3] Testar se o botão funciona para todas as academias no sistema

### Implementação para User Story 3

- [x] T053 [P] [US3] Implementar geração de URL do Google Maps para rotas
- [x] T054 [US3] Adicionar botão "Como chegar" em AcademyDetailView

**Ponto de checagem**: Todas as user stories agora devem estar independentemente funcionais

---

## Fase N: Polimento & Questões Transversais (Cross-Cutting Concerns)

**Propósito**: Melhorias que afetam múltiplas user stories

- [ ] T057 [P] Atualizações de documentação em docs/
- [ ] T058 [P] Limpeza de código e refatoração
- [ ] T059 [P] Otimização de performance em todas as stories
- [ ] T060 [P] Testes unitários adicionais (se solicitados) em tests/unit/
- [ ] T061 [P] Reforço de segurança
- [ ] T062 [P] Rodar validação do quickstart.md
- [ ] T063 [P] Adicionar validação e formatação do idioma Português
- [ ] T064 [P] Implementar design responsivo para breakpoints mobile
- [ ] T065 [P] Adicionar error boundaries e UIs de fallback
- [ ] T066 [P] Otimizar performance de marcadores Leaflet para grandes conjuntos de dados
- [ ] T067 [P] Implementar camada de cache para consultas de busca frequentes
- [ ] T068 [P] Implementar feature de histórico de buscas
- [ ] T069 [P] Adicionar funcionalidade de compartilhamento para detalhes da academia

---

## Dependências & Ordem de Execução

### Dependências das Fases

- **Setup (Fase 1)**: Sem dependências - pode começar imediatamente
- **Fundacional (Fase 2)**: Depende da conclusão do Setup - BLOQUEIA todas as user stories
- **User Stories (Fase 3+)**: Todas dependem da conclusão da fase Fundacional
  - User stories podem então seguir em paralelo (se houver equipe)
  - Ou sequencialmente na ordem de prioridade (P1 → P2 → P3)
- **Polimento (Fase Final)**: Depende de todas as user stories desejadas estarem completas

### Dependências das User Stories

- **User Story 1 (P1)**: Pode começar após a Fundacional (Fase 2) - Sem dependências de outras stories
- **User Story 2 (P2)**: Pode começar após a Fundacional (Fase 2) - Pode integrar com US1 mas deve ser testável de forma independente
- **User Story 3 (P3)**: Pode começar após a Fundacional (Fase 2) - Pode integrar com US1/US2 mas deve ser testável de forma independente

### Dentro de Cada User Story

- Testes (se incluídos) DEVEM ser escritos e FALHAR antes da implementação
- Models antes de services
- Services antes de endpoints
- Implementação core antes da integração
- Story completa antes de passar para a próxima prioridade

### Oportunidades de Paralelismo

- Todas as tarefas de Setup marcadas com [P] podem rodar em paralelo
- Todas as tarefas Fundacionais marcadas com [P] podem rodar em paralelo (dentro da Fase 2)
- Uma vez que a fase Fundacional for concluída, todas as user stories podem começar em paralelo (se a capacidade da equipe permitir)
- Todos os testes para uma user story marcados com [P] podem rodar em paralelo
- Models dentro de uma story marcados com [P] podem rodar em paralelo
- Diferentes user stories podem ser trabalhadas em paralelo por diferentes membros da equipe

---

## Estratégia de Implementação

### MVP Primeiro (Apenas User Story 1)

1. Completar Fase 1: Setup
2. Completar Fase 2: Fundacional (CRÍTICO - bloqueia todas as stories)
3. Completar Fase 3: User Story 1
4. **PARAR e VALIDAR**: Testar User Story 1 independentemente
5. Fazer deploy/demo se pronto

### Entrega Incremental

1. Completar Setup + Fundacional → Fundação pronta
2. Adicionar User Story 1 → Testar independentemente → Deploy/Demo (MVP!)
3. Adicionar User Story 2 → Testar independentemente → Deploy/Demo
4. Adicionar User Story 3 → Testar independentemente → Deploy/Demo
5. Cada story adiciona valor sem quebrar stories anteriores

### Estratégia de Equipe em Paralelo

Com múltiplos desenvolvedores:

1. Equipe completa Setup + Fundacional juntos
2. Uma vez que o Fundacional estiver pronto:
   - Desenvolvedor A: User Story 1
   - Desenvolvedor B: User Story 2
   - Desenvolvedor C: User Story 3
3. Stories são completadas e integradas independentemente

---

## Notas

- Tarefas com [P] = arquivos diferentes, sem dependências
- Label [Story] mapeia tarefa para user story específica para rastreabilidade
- Cada user story deve ser completável e testável de forma independente
- Verifique se os testes falham antes de implementar
- Faça commit após cada tarefa ou grupo lógico
- Pare em qualquer ponto de checagem para validar a story independentemente
- Evite: tarefas vagas, conflitos no mesmo arquivo, dependências cruzadas entre stories que quebrem a independência

---

## Exemplo em Paralelo: User Story 1

```bash
# Lançar todos os testes para a User Story 1 juntos (se testes solicitados):
Task: "Testar funcionalidade de busca por localização em texto"
Task: "Testar funcionalidade de busca por geolocalização"
Task: "Testar filtro de modalidades com lógica OR"

# Lançar todos os models para a User Story 1 juntos:
Task: "Criar componente SearchBar.vue em src/components/"
Task: "Criar componente ModalityChips.vue em src/components/"
Task: "Criar componente AcademyCard.vue em src/components/"
```