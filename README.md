# Advanced To Do List

Aplicação de gerenciamento de tarefas que permite: cadastro de usuários, gerenciamento de tarefas públicas e privadas, dashboard de acompanhamento e edição de perfil.

## Funcionalidades

- Cadastro e login de usuários
- Dashboard com métricas das tarefas
- Criação, edição e exclusão de tarefas
- Controle de status (Cadastrada, Em Andamento e Concluída)
- Tarefas públicas e privadas
- Perfil do usuário com foto em Base64
- Drawer de navegação com informações do usuário
- Pesquisa de tarefas por nome
- Filtro para exibição de tarefas concluídas
- Paginação com limite de 4 tarefas por página
- Controle de acesso utilizando publicações do Meteor

## Tecnologias Utilizadas

- Meteor
- JavaScript
- React
- Material UI (MUI)
- MongoDB

## Estrutura Geral

### Home
Dashboard com indicadores das tarefas públicas, privadas ou ambas.

### Tarefas
Listagem, pesquisa, filtros e paginação.

### Detalhes da Tarefa
Visualização, edição e alteração do status da tarefa.

### Perfil
Gerenciamento dos dados do usuário.

## Regras de Negócio

- Apenas usuários cadastrados podem acessar o sistema.
- Somente o criador pode editar ou excluir uma tarefa.
- Tarefas privadas são visíveis apenas para o usuário que as criou.
- Tarefas públicas podem ser visualizadas por todos os usuários autenticados.
- Filtros, pesquisa e paginação são processados no servidor através das publicações do Meteor.

## Como Executar
Caso não tenha o Meteor insatalado:
```bash
meteor npm install
meteor run ou meteor
```
Se já tiver o Meteor:
```bash
meteor run ou meteor
```

A aplicação estará disponível em:

```text
http://localhost:3000
```
