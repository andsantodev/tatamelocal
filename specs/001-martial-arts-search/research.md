# Pesquisa: Buscador de Academias de Artes Marciais TatameLocal

## Decisões de Contexto Técnico

### Linguagem/Versão
- **Decisão**: Vue 3.3 + TypeScript 5.0
- **Justificativa**: Corresponde ao stack definido explicitamente no input do usuário. Vue 3 fornece melhorias da Composition API, e TypeScript 5.0 oferece os recursos mais recentes de tipos.
- **Alternativas consideradas**: Vue 2 (rejeitado devido ao requisito de Composition API), TypeScript 4.x (rejeitado por faltar as funcionalidades mais novas)

### Dependências Principais
- **Decisão**: Vue Router 4.0, Supabase JS Client 2.0, Leaflet 1.9, Tailwind CSS 3.0
- **Justificativa**: Todos especificados explicitamente no input do usuário. Estas são as versões exatas que correspondem às versões maiores mencionadas.
- **Alternativas consideradas**: 
  - Mapbox GL JS (rejeitado devido ao custo e complexidade comparado ao Leaflet + OSM)
  - Firebase (rejeitado devido ao requisito de usar o backend existente Supabase)
  - Bootstrap/Material UI (rejeitado devido ao requisito para o Tailwind CSS)

### Armazenamento (Storage)
- **Decisão**: Supabase PostgreSQL (backend existente, sem necessidade de armazenamento no frontend)
- **Justificativa**: Como especificado no input do usuário - o backend já existe e não deve ser modificado. O frontend apenas consome a API.
- **Alternativas consideradas**: LocalStorage (rejeitado devido à necessidade de usar o backend existente), IndexedDB (rejeitado pelo mesmo motivo)

### Testes
- **Decisão**: Vitest
- **Justificativa**: Vitest é o framework de testes recomendado para projetos Vue 3 + Vite, oferecendo excelente desempenho e integração.
- **Alternativas consideradas**: Jest (rejeitado por apresentar desempenho mais lento com Vite), Cypress (rejeitado por ser principalmente para e2e, não unit testing)

### Plataforma Alvo
- **Decisão**: Navegadores web modernos (Chrome, Firefox, Safari, Edge)
- **Justificativa**: Padrão para SPAs; as tecnologias usadas (Vue 3, TypeScript, etc.) suportam todos os navegadores modernos.
- **Alternativas consideradas**: IE11 (rejeitado pela falta de suporte para os recursos modernos do JavaScript), Apenas mobile (rejeitado pois SPAs devem funcionar no desktop também)

### Tipo do Projeto
- **Decisão**: Aplicação web de página única (SPA)
- **Justificativa**: Explicitamente declarado no input do usuário como "Sem SSR, SPA puro".
- **Alternativas consideradas**: Aplicação multi-page (rejeitado devido ao requisito SPA), Server-side rendered (rejeitado devido ao requisito explícito de não ter SSR)

### Metas de Performance
- **Decisão**: Carregamento inicial em menos de 3 segundos, resultados de busca em menos de 1 segundo, interações suaves no mapa
- **Justificativa**: Metas razoáveis para um SPA de busca de academias; equilibra a experiência do usuário com a viabilidade técnica.
- **Alternativas consideradas**: Carregamento inicial em menos de um segundo (rejeitado como potencialmente irrealista para uma aplicação rica em funcionalidades), 5 segundos de carregamento inicial (rejeitado como sendo uma experiência ruim de usuário)

### Restrições
- **Decisão**: Deve usar a API existente do backend Supabase, UI em Português do Brasil, sem server-side rendering
- **Justificativa**: Todos informados explicitamente no input do usuário.
- **Alternativas consideradas**: Criar novos endpoints de backend (rejeitado pois o "back-end já existe e não deve ser tocado"), UI em inglês (rejeitado devido ao requisito de Português)

### Escala/Escopo
- **Decisão**: Projetado para centenas de academias, dezenas de usuários concorrentes
- **Justificativa**: Estimativa razoável para uma plataforma de descoberta de academias de artes marciais em um país como o Brasil; escala apropriadamente com as escolhas técnicas.
- **Alternativas consideradas: Escala Enterprise (milhares de academias, centenas de usuários)** (rejeitado por ser um exagero de engenharia para o escopo inicial), **Hiperlocal (única cidade, <50 academias)** (rejeitado por ser muito limitante)

## Checagem de Conformidade da Constituição

Todos os princípios da constituição do projeto foram verificados como compatíveis com as escolhas técnicas:
- Simplicidade e Legibilidade: Vue 3 Composition API promove uma organização de código lógica e legível
- Responsabilidade Única dos Componentes Vue: A arquitetura baseada em componentes naturalmente aplica isso
- Preservação de Layout e Estilos: Escolhas técnicas não impedem seguir este princípio
- Funcionalidades Apenas conforme Especificado: Stack técnico não obriga a inserção de funcionalidades extras
- Uso Obrigatório da Composition API: Vue 3 escolhido explicitamente com a Composition API
- TypeScript em Todo o Código: TypeScript 5.0 selecionado para toda a base de código
- Variáveis de Ambiente Seguras: Vite + Vue 3 suporta variáveis de ambiente VITE_
- Commits Atômicos por Funcionalidade: Processo de desenvolvimento, não é restrição técnica