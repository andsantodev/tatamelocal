# Modelo de Dados: Buscador de Academias de Artes Marciais TatameLocal

## Entidades Principais

### Academia
Representa uma academia de artes marciais ou ginásio no sistema.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-------------|-------------|
| id | string (UUID) | Identificador único | Chave primária, not null |
| nome | string (máx 200) | Nome da academia | Not null |
| endereco | string (máx 300) | Endereço completo | Not null |
| modalidades | string[] (array) | Artes marciais oferecidas | Not null, valores de: Jiu-Jitsu, Muay Thai, MMA, Boxe, Judô, Capoeira, Karatê |
| telefone | string (máx 20) | Número do telefone de contato | Validação de formato opcional |
| whatsapp | string (URL) | Link de contato do WhatsApp | Deve ser uma URL válida do wa.me ou whatsapp.com |
| website | string (URL) | Website da academia | Formato de URL válido |
| rating | decimal (2,1) | Avaliação média (0.0-5.0) | Entre 0.0 e 5.0, uma casa decimal |
| horario_funcionamento | JSON object | Horários estruturados de funcionamento | Veja o tipo HorarioFuncionamento abaixo |
| imagem_capa | string (URL) | URL da imagem de capa | URL de imagem válida (jpg, png, webp) |
| latitude | decimal (10,8) | Coordenada GPS de latitude | Entre -90 e 90 |
| longitude | decimal (11,8) | Coordenada GPS de longitude | Entre -180 e 180 |
| criado_em | timestamp | Timestamp da criação do registro | Not null, padrão: now() |
| atualizado_em | timestamp | Timestamp da atualização do registro | Not null, padrão: now() |

### HorarioFuncionamento (Horários de Funcionamento)
Representação estruturada do cronograma semanal.

| Campo | Tipo | Descrição |
|-------|------|-------------|
| segunda | string | Horários de Segunda-feira (ex: "08:00-22:00" ou "Fechado") |
| terca | string | Horários de Terça-feira |
| quarta | string | Horários de Quarta-feira |
| quinta | string | Horários de Quinta-feira |
| sexta | string | Horários de Sexta-feira |
| sabado | string | Horários de Sábado |
| domingo | string | Horários de Domingo |

*Cada campo de dia segue o formato: "HH:MM-HH:MM" para os horários abertos ou "Fechado".*

## Relacionamentos dos Dados

Este é um modelo de dados simplificado com uma única entidade principal (Academia), já que o sistema é focado primariamente em buscar e exibir as informações de academias de um backend existente. Não existem relacionamentos diretos entre entidades no escopo atual.

## Regras de Validação

1. **Array de Modalidades**: Deve conter pelo menos uma modalidade da lista de valores permitidos
2. **Rating**: Deve estar entre 0.0 e 5.0 com uma casa decimal de precisão
3. **Coordenadas**: 
   - Latitude: -90 a 90
   - Longitude: -180 a 180
4. **Campos de URL**: Devem ser URLs HTTP/HTTPS válidas quando fornecidos
5. **Telefone**: Quando fornecido, deve seguir o formato de telefone do Brasil (validação opcional)
6. **Horário de Funcionamento**: Cada dia deve ser "Fechado" ou ter o formato "HH:MM-HH:MM" (tempo em 24 horas)

## Interface com o Backend

O backend Supabase existente fornece:
- Uma função RPC `search_by_location(user_lat, user_lng, radius_km, martial_art)` para buscar com base na localização
- Consultas (queries) SQL padrão para a busca e filtro baseados em texto
- Todos os campos listados na entidade Academia estão disponíveis pela API

## Uso dos Dados no Frontend

O frontend consome este modelo de dados para:
- Exibir resultados de busca em listas e em mapas
- Mostrar informações detalhadas da academia na visão de detalhes
- Filtrar resultados pelas modalidades selecionadas
- Calcular distâncias para ordenação/busca
- Gerar links do Google Maps para rotas