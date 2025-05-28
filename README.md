task-manager-api
API RESTful para gerenciamento de tarefas com autenticação via JWT usando NestJS, TypeORM e SQLite.

Tecnologias
Node.js + NestJS
TypeORM
SQLite
JWT para autenticação
Bcrypt para hash de senhas
Jest para testes unitários

Instalação e Execução
Clone o repositório:
- git clone <https://github.com/arthvin/2bmTopicosProgramacao7s>
- cd task-manager-api

Instale as dependências:
- npm install

Execute a aplicação:
- npm run start
  
A API estará rodando em http://localhost:3000.

Endpoints
1. Autenticação
Cadastro de usuário (Register)
POST /auth/register

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
POST /auth/login

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

1. Tarefas (Tasks)
IMPORTANTE: Todos os endpoints de tarefas exigem autenticação.
Inclua o token JWT no header:
Authorization: Bearer <seu_token_aqui>

Criar nova tarefa
POST /tasks

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

Listar todas as tarefas
GET /tasks

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

Atualizar status da tarefa
PATCH /tasks/:id/status

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

Deletar tarefa
DELETE /tasks/:id

Parâmetro: id - ID da tarefa a ser deletada

Resposta: 204 No Content (sem corpo)

Exemplo usando curl:

curl -X DELETE http://localhost:3000/tasks/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."

Para rodar os testes unitários da aplicação, execute:
- npm run test

Observações
Senhas são armazenadas com hash usando bcrypt.

O banco de dados usado é SQLite para facilitar o desenvolvimento e testes.

Nome: Arthur Vinicius de Oliveira Semensati
RA: 23105149-2