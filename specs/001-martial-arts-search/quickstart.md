# Guia Rápido: Buscador de Academias de Artes Marciais TatameLocal

## Propósito
Validar que a funcionalidade principal do buscador de academias de artes marciais TatameLocal funciona conforme especificado.

## Pré-requisitos
- Node.js 18+ instalado
- Gerenciador de pacotes npm ou yarn
- Acesso ao backend Supabase existente (URL e anon key)

## Instruções de Configuração

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd tatamelocal
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` no diretório raiz com:
   ```
   VITE_SUPABASE_URL=sua_url_do_supabase_aqui
   VITE_SUPABASE_ANON_KEY=sua_anon_key_do_supabase_aqui
   ```

4. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Execute os testes**
   ```bash
   npm run test
   ```

## Cenários de Validação

### Cenário 1: Buscar por Localização em Texto
1. Acesse http://localhost:5173
2. Insira "Rio de Janeiro" no campo de texto da busca
3. Selecione o chip da modalidade "Jiu-Jitsu" (Opcional)
4. Clique no botão buscar
5. Verifique a navegação para a página /resultados
6. Verifique se a lista mostra apenas academias de Jiu-Jitsu no Rio de Janeiro
7. Verifique se o mapa exibe os pins de todas as academias listadas
8. Verifique se o zoom do mapa mostra todos os pins sem ajuste manual

### Cenário 2: Buscar por Geolocalização
1. Acesse http://localhost:5173
2. Clique no botão de geolocalização
3. Permita o acesso à localização quando solicitado
4. Clique no botão buscar (sem inserir texto ou selecionar modalidades)
5. Verifique a navegação para a página /resultados
6. Verifique se a lista mostra academias próximas à localização atual
7. Verifique se o mapa está centralizado na localização atual
8. Verifique se o zoom do mapa mostra todos os pins sem ajuste manual

### Cenário 3: Ver Detalhes da Academia
1. Realize uma busca (por texto ou geolocalização)
2. Clique em qualquer card de academia na lista de resultados
3. Verifique se o mapa dá zoom no pin da academia clicada
4. Verifique se ao clicar no pin da academia abre um pequeno popup com as informações de nome da academia, endereço e botão para ver detalhes.
5. Verifique se ao clicar no botão para ver detalhes ocorre a navegação para a página com a slug da academia.
6. Verifique a exibição de: nome, endereço, modalidades, telefone, WhatsApp, website, rating, horários, imagem de capa
7. Verifique se o botão "Como chegar" abre o Google Maps com o endereço correto

### Cenário 4: Limpar Filtros de Busca
1. Realize uma busca com texto e seleção de modalidades
2. Limpe o campo de texto da busca
3. Verifique se todas as seleções de modalidade foram limpas
4. Verifique se o botão buscar torna-se habilitado para uma nova busca

### Cenário 5: Nenhum Resultado Encontrado
1. Busque por uma localização sem academias (ex: no meio do oceano ou em uma área isolada)
2. Verifique se a mensagem ilustrativa de "nenhum resultado" é exibida
3. Verifique se o mapa permanece centralizado na localização buscada
4. Verifique se nenhum pin é exibido no mapa

## Critérios de Sucesso
- [ ] Busca por localização em texto retorna resultados relevantes em menos de 1 segundo
- [ ] Busca por geolocalização retorna resultados relevantes em menos de 1 segundo
- [ ] Viewport do mapa ajusta-se automaticamente para mostrar 100% dos pins retornados
- [ ] 90% dos usuários testados conseguem navegar para os detalhes da academia a partir dos resultados
- [ ] O botão "Como chegar" abre corretamente o Google Maps com o endereço da academia
- [ ] O spinner de carregamento é exibido durante todas as requisições à API
- [ ] A seleção de múltiplas modalidades funciona com lógica OR (mostra academias com QUALQUER modalidade selecionada)
- [ ] Negação da geolocalização pede que a localização seja inserida manualmente
- [ ] Ao clicar no botão para ver detalhes ocorre a navegação para a página com a slug da academia.
- [ ] O card da academia na página de detalhes deve conter as seguintes informações: nome, endereço, modalidades, telefone, WhatsApp, website, rating, horários, imagem de capa.