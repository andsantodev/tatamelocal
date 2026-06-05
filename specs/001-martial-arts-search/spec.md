# Especificação da Funcionalidade: Buscador de Academias de Artes Marciais TatameLocal

**Branch da Feature**: `001-martial-arts-search`

**Criado em**: 2026-05-27

**Status**: Rascunho

**Entrada**: Descrição do usuário: "Plataforma web chamada TatameLocal para encontrar academias de artes marciais próximas ao usuário. O back-end já existe (Supabase/PostgreSQL) e não deve ser tocado. O front-end apenas consulta o banco.

Telas necessárias:
1. HOME: campo de busca por texto (cidade ou bairro), botão de geolocalização, chips de modalidade (Jiu-Jitsu, Muay Thai, MMA, Boxe, Judô, Capoeira, Karatê) e botão buscar. Ao buscar, navega para a tela de Resultados.
2. RESULTADOS: painel esquerdo com campo de busca, chips de modalidade e lista de cards de academias. Painel direito com mapa interativo mostrando pins das academias. Ao clicar no pin, é possivel ver um pequeno popup com as informações: nome da academia, endereço, e botão para ver detalhes.
3. DETALHES: página completa da academia com nome, endereço, modalidades, telefone, WhatsApp, site, rating, horários de funcionamento, imagem de capa e botão "Como chegar" abrindo Google Maps.

Comportamentos importantes: mapa deve dar zoom automático para mostrar todos os pins encontrados. Se não houver resultados, exibir mensagem ilustrativa mas manter o mapa na localidade buscada. Apagar o texto da busca limpa todos os filtros."

## Esclarecimentos

### Sessão 2026-05-27
- P: Como a aplicação deve lidar com os estados de carregamento (loading) durante as requisições à API (busca, detalhes da academia)? → R: Mostrar um spinner simples ou indicador de carregamento
- P: Como os usuários devem selecionar as modalidades de artes marciais nos filtros de busca? → R: Múltiplas modalidades podem ser selecionadas simultaneamente (lógica OR)
- P: O que deve acontecer quando um usuário clica no botão de geolocalização, mas o acesso à localização for negado ou indisponível? → R: Pedir ao usuário para inserir a localização manualmente

## Cenários de Usuário e Testes *(obrigatório)*

### User Story 1 - Buscar Academias por Localização e Modalidade (Prioridade: P1)
Como usuário, eu quero buscar academias de artes marciais próximas a mim inserindo uma cidade ou bairro e opcionalmente selecionando modalidades, para que eu possa encontrar opções relevantes. Caso eu não selecione modalidades quero visualizar todas as modalidades disponíveis na localidade escolhida.

**Por que esta prioridade**: Esta é a funcionalidade principal da aplicação; sem a busca, os usuários não conseguem encontrar academias.

**Teste Independente**: Pode ser totalmente testado realizando uma busca com diversas entradas de localização e opcionalmente seleções de modalidades, depois verificando se os resultados retornados correspondem a todos os critérios especificados (relevância da localização e filtros de modalidade).

**Cenários de Aceitação**:
1. **Dado** que o usuário está na tela HOME, **Quando** o usuário insere "São Paulo" no campo de texto da busca, opcionalmente seleciona os chips de modalidade "Jiu-Jitsu" e "Muay Thai", e clica no botão de buscar, **Então** a aplicação navega para a tela RESULTADOS exibindo apenas academias que oferecem Jiu-Jitsu ou Muay Thai na área de São Paulo. Caso o usuário não selecione modalidades, deve retornar todas as modalidades disponíveis na área de São Paulo.
2. **Dado** que o usuário está na tela HOME, **Quando** o usuário clica no botão de geolocalização, permite o acesso à localização, e clica em buscar sem inserir texto ou selecionar modalidades, **Então** a aplicação navega para a tela RESULTADOS exibindo academias próximas à localização atual do usuário sem nenhum filtro de modalidade aplicado.

### User Story 2 - Visualizar Detalhes da Academia (Prioridade: P2)
Como usuário, eu quero clicar em uma academia nos resultados da busca para ver informações detalhadas, para que eu possa decidir se vou visitá-la.

**Por que esta prioridade**: Os usuários precisam de informações suficientes para avaliar as academias antes de visitá-las; isso permite decisões embasadas.

**Teste Independente**: Pode ser totalmente testado selecionando qualquer academia do mapa, e então verificando se a tela DETALHES exibe todas as informações esperadas para aquela academia de forma precisa.

**Cenários de Aceitação**:
1. **Dado** que o usuário está na tela RESULTADOS exibindo uma lista de cards de academias, **Quando** o usuário toca em um card específico, **Então** o mapa dá zoom na academia selecionada e ao clicar no pin da academia no mapa e ver as informações da academia em um popup e clicar no botão "Ver Detalhes", a aplicação navega para a tela DETALHES para aquela academia mostrando seu nome, endereço, modalidades, telefone, WhatsApp, website, rating, horários, imagem de capa, e o botão "Como chegar".
2. **Dado** que o usuário está na tela RESULTADOS exibindo um mapa com pins de academias, **Quando** o usuário toca em um pin específico no mapa para ver as informações da academia em um popup e clicar no botão "Ver Detalhes", **Então** a aplicação navega para a tela DETALHES daquela academia mostrando todas as suas informações detalhadas.

### User Story 3 - Obter Rotas para a Academia (Prioridade: P3)
Como usuário, eu quero clicar em um botão "Como chegar" para abrir o Google Maps com as rotas, para que eu possa navegar facilmente até a academia.

**Por que esta prioridade**: Melhora a usabilidade reduzindo o atrito para os usuários que decidem visitar uma academia após visualizar os detalhes.

**Teste Independente**: Pode ser totalmente testado visualizando a página de detalhes de qualquer academia, clicando no botão "Como chegar" e verificando se o Google Maps abre com o endereço da academia já preenchido como destino.

**Cenários de Aceitação**:
1. **Dado** que o usuário está na tela DETALHES para uma academia com o endereço "Rua das Academias, 123", **Quando** o usuário clica no botão "Como chegar", **Então** o Google Maps abre (via app ou web) com as rotas para "Rua das Academias, 123" como destino.

### Casos Extremos (Edge Cases)
- O que acontece quando a busca não retorna resultados? (Abordado nos requisitos)
- Como o sistema lida com entradas de localização inválidas ou ambíguas? (ex: cidade inexistente)
- O que ocorre se o usuário negar a requisição de permissão de geolocalização?
- Como os caracteres especiais no texto de busca são tratados?

## Requisitos *(obrigatório)*

### Requisitos Funcionais
- **FR-001**: O sistema DEVE permitir que os usuários busquem por academias de artes marciais por entrada de texto (cidade ou bairro)
- **FR-002**: O sistema DEVE permitir que os usuários filtrem os resultados por nenhuma ou mais de uma modalidades de artes marciais (Jiu-Jitsu, Muay Thai, MMA, Boxe, Judô, Capoeira, Karatê) - uma academia é correspondente se oferecer QUALQUER UMA das modalidades selecionadas
- **FR-003**: O sistema DEVE permitir que os usuários usem a geolocalização para detectar a posição atual para a busca; se a geolocalização for negada ou indisponível, o sistema DEVE pedir ao usuário que insira a localização manualmente
- **FR-004**: O sistema DEVE exibir os resultados da busca em formato de lista com cards da academia mostrando informações essenciais (pelo menos nome e modalidade)
- **FR-005**: O sistema DEVE exibir os resultados da busca em um mapa interativo com pins para cada academia
- **FR-006**: O sistema DEVE permitir que os usuários naveguem dos resultados da busca para uma página de detalhes da academia ao clicar em um pin do mapa
- **FR-007**: O sistema DEVE exibir uma página de detalhes da academia com nome, endereço, modalidades, telefone, WhatsApp, website, rating, horários de funcionamento, imagem de capa e botão "Como chegar"
- **FR-008**: O sistema DEVE ajustar automaticamente o zoom do mapa para mostrar todos os pins das academias quando os resultados forem exibidos
- **FR-009**: O sistema DEVE exibir uma mensagem ilustrativa quando nenhuma academia corresponder aos critérios de busca, mantendo o mapa centralizado na localização buscada
- **FR-010**: O sistema DEVE limpar todos os filtros de busca (entrada de texto e seleções de modalidade) quando o input de texto da busca for apagado
- **FR-011**: O sistema DEVE mostrar um indicador de carregamento (loading) durante as requisições de API para resultados de busca e detalhes da academia

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis
- **SC-001**: Usuários podem completar uma busca por academias (inserir localização, selecionar modalidades, enviar) em menos de 10 segundos
- **SC-002**: Quando os resultados da academia são exibidos, a viewport do mapa se ajusta automaticamente para mostrar 100% dos pins retornados sem exigir zoom ou scroll (pan) manual
- **SC-003**: 90% dos usuários que realizarem uma busca navegam com sucesso para pelo menos uma página de detalhes de academia a partir dos resultados
- **SC-004**: Para cada academia exibida nos resultados ou nos detalhes, o botão "Como chegar" abre corretamente o Google Maps com o endereço completo da academia pré-preenchido como o destino

## Premissas (Assumptions)
- A API do back-end fornece um endpoint de busca aceitando filtros de localização (texto ou coordenadas) e modalidade, retornando os dados da academia incluindo: nome, endereço, modalidades (array), telefone, URL do WhatsApp, URL do website, rating (numérico), horários de funcionamento (dados estruturados) e URL da imagem de capa
- O back-end já existe e está totalmente funcional; o desenvolvimento do front-end não modificará nenhum código do back-end ou schema do banco de dados
- Os usuários concedem permissões de localização no navegador quando solicitados para a funcionalidade de geolocalização (se suportado e disponível)
- As sete modalidades de artes marciais listadas (Jiu-Jitsu, Muay Thai, MMA, Boxe, Judô, Capoeira, Karatê) representam o conjunto completo disponível no sistema
- Os dados da academia recebidos do back-end estão completos e precisos para todos os campos de exibição exigidos; nenhum cenário de dados parciais ou ausentes precisará ser tratado no front-end
- A integração do Google Maps é alcançável via esquemas de URL padrão (ex: `https://www.google.com/maps/search/?api=1&query=ENDERECO`) ou widgets embutíveis para requisições de rotas