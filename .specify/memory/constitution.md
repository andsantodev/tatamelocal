# Constituição do Projeto de Portfólio

## Princípios Fundamentais

### Princípio 1: Simplicidade e Legibilidade
Priorize código simples e legível sobre otimizações prematuras. Evite complexidade desnecessária até que seja comprovadamente necessária.

### Princípio 2: Responsabilidade Única dos Componentes Vue
Cada componente Vue deve ter uma única responsabilidade bem definida, facilitando manutenção e reutilização.

### Princípio 3: Preservação de Layout e Estilos
Nunca alterar layout ou estilos sem instrução explícita. Todas as mudanças de UI devem ser solicitadas especificamente.

### Princípio 4: Funcionalidades Apenas conforme Especificado
Nunca inventar funcionalidades não descritas nos requisitos. Implemente apenas o que está claramente definido.

### Princípio 5: Uso Obrigatório da Composition API
Sempre usar Composition API com <script setup> em todos os componentes Vue para melhor organização e reutilização de lógica.

### Princípio 6: TypeScript em Todo o Código
TypeScript obrigatório em todos os arquivos .ts e .vue para garantir segurança de tipos e melhor experiência de desenvolvimento.

### Princípio 7: Variáveis de Ambiente Seguras
Variáveis de ambiente devem ser acessadas apenas via VITE_ e nunca expostas diretamente no código do aplicativo.

### Princípio 8: Commits Atômicos por Funcionalidade
Faça commits atômicos contendo apenas uma única alteração lógica relacionada a uma funcionalidade específica.

## Práticas de Desenvolvimento
- Use Composition API com <script setup> em todos os componentes Vue.
- Mantenha os componentes com responsabilidade única.
- Nunca altere layout ou estilos sem instrução explícita.
- Não invente funcionalidades não descritas nos requisitos.

## Fluxo de Trabalho e Qualidade
- Todas as alterações de código devem ser feitas com TypeScript em arquivos .ts e .vue.
- Variáveis de ambiente devem ser acessadas via VITE_ e nunca expostas diretamente no código.
- Faça commits atômicos por funcionalidade, cada contendo uma única alteração lógica.

## Governança
Esta constituição substitui todas as outras práticas. Alterações requerem documentação, aprovação e plano de migração.
Todas as PRs/revisões devem verificar a conformidade com estes princípios.
Use o arquivo de orientação em tempo de desenvolvimento para diretrizes específicas.

**Versão**: 1.0.0 | **Ratificado**: 2026-05-27 | **Última Alteração**: 2026-05-27