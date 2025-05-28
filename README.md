API RESTful para Gerenciamento de Tarefas
Uma API RESTful completa para gerenciamento de tarefas, com autenticação de usuário via JWT. Desenvolvida utilizando NestJS, TypeORM e SQLite para um ambiente de desenvolvimento e testes simplificado.
Tecnologias Utilizadas
Node.js + NestJS: Framework progressivo para construção de aplicações Node.js eficientes e escaláveis.
TypeORM: ORM (Object-Relational Mapper) que suporta diversos bancos de dados, utilizado aqui com SQLite.
SQLite: Banco de dados leve e sem servidor, ideal para desenvolvimento e testes.
JWT (JSON Web Tokens): Padrão para criação de tokens de acesso seguros para autenticação.
Bcrypt: Biblioteca para hash de senhas, garantindo que as senhas sejam armazenadas de forma segura.
Jest: Framework de testes JavaScript para testes unitários.
Instalação e Execução
Siga os passos abaixo para configurar e executar a aplicação em sua máquina local.
Clone o repositório:
git clone https://github.com/arthvin/2bmTopicosProgramacao7s
cd task-manager-api


Instale as dependências:
npm install


Execute a aplicação:
npm run start

A API estará rodando em http://localhost:3000.
Endpoints da API
1. Autenticação
Cadastro de Usuário (Register)
Endpoint: POST /auth/register
Payload:
{
  "username": "usuario1",
  "password": "senha123"
}


Resposta:
{
  "message": "Usuário registrado com sucesso"
}


Exemplo usando curl:
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"usuario1","password":"senha123"}'


Login
Endpoint: POST /auth/login
Payload:
{
  "username": "usuario1",
  "password": "senha123"
}


Resposta:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}


Exemplo usando curl:
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{"username":"usuario1","password":"senha123"}'


2. Tarefas (Tasks)
IMPORTANTE: Todos os endpoints de tarefas exigem autenticação. Inclua o token JWT no cabeçalho Authorization no formato: Authorization: Bearer <seu_token_aqui>
Criar Nova Tarefa
Endpoint: POST /tasks
Payload:
{
  "title": "Comprar leite",
  "description": "Comprar leite no supermercado"
}


Resposta:
{
  "id": 1,
  "title": "Comprar leite",
  "description": "Comprar leite no supermercado",
  "status": "PENDENTE"
}


Exemplo usando curl:
curl -X POST http://localhost:3000/tasks \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
-H "Content-Type: application/json" \
-d '{"title":"Comprar leite","description":"Comprar leite no supermercado"}'


Listar Todas as Tarefas
Endpoint: GET /tasks
Resposta:
[
  {
    "id": 1,
    "title": "Comprar leite",
    "description": "Comprar leite no supermercado",
    "status": "PENDENTE"
  }
]


Exemplo usando curl:
curl -X GET http://localhost:3000/tasks \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."


Atualizar Status da Tarefa
Endpoint: PATCH /tasks/:id/status
Parâmetro: id - ID da tarefa a ser atualizada
Payload:
{
  "status": "CONCLUÍDO"
}


Resposta:
{
  "id": 1,
  "title": "Comprar leite",
  "description": "Comprar leite no supermercado",
  "status": "CONCLUÍDO"
}


Exemplo usando curl:
curl -X PATCH http://localhost:3000/tasks/1/status \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
-H "Content-Type: application/json" \
-d '{"status":"CONCLUÍDO"}'


Deletar Tarefa
Endpoint: DELETE /tasks/:id
Parâmetro: id - ID da tarefa a ser deletada
Resposta: 204 No Content (sem corpo)
Exemplo usando curl:
curl -X DELETE http://localhost:3000/tasks/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."


Testes Unitários
Para rodar os testes unitários da aplicação, execute:
npm run test


Observações
As senhas são armazenadas com hash usando bcrypt para maior segurança.
O banco de dados utilizado é o SQLite, o que facilita o desenvolvimento e os testes, eliminando a necessidade de configurar um servidor de banco de dados externo.
Nome: Arthur Vinicius de Oliveira Semensati
RA: 23105149-2
