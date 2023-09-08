API básica integrada ao banco de dados Mongo para trabalhar com o projeto Around the U.S.

A api possui funções como:

GET /users/ = Acessa todos os usuários do banco de dados
GET /users/:id = Acessa um usuário específico do banco de dados
POST /users/ = Adiciona um novo usuário
PATCH /users/me = Modifica o perfíl do usuário
DELETE /users/me/avatar = Deleta o usuário

GET /cards/ = Retorna todos os cartões do banco de dados
DELETE /cards/cardId = Deleta um cartão específico
POST /cards/ = Adiciona um novo cartão
PUT /cards/cardId/likes = Função de curtir um cartão
DELETE /cards/cardId/likes Função de descurtir um cartão
