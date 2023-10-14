Around the U.S

Around the U.S é uma rede social de compartilhamento de imagens e informações entre os usuários totalmente fumcional hospedada via google cloud. O website possúi funcionalidades como registro e login, login automático via token, abrir formulários, abrir imagem do card clicado, editar nome e descrição, mudar foto de perfil, adicionar, curtir e deletar cards.

A página é altamente responsiva, com diferentes layouts para diferentes tipos de dispositivos:

- Até 414px;
- 414px a 600px;
- 600px a 894px;

- Resoluções superiores;

Nesse projeto foram utilizados diversas tecnologias desenvolvimento web, como por exemplo:

Frontend:
- HTML;
- CSS;
- Javascript;
- Metodologia BEM;
- Webpack;
- React.js;

Backend:
- Node.js;
- Express.js;
- MongoDB;

Servidor Remoto:
- Google Cloud;
- Nginx;

Funcionalidades a serem adicionadas:

- Validação de formulário
- Popup 'Tem certeza ?' ao excluir cartões
- Fechar Popup apenas com o fim da solicitação á API

Links do projeto:
- https://around-full.awiki.org
- https://www.around-full.awiki.org

Link da API do projeto:
- https://api.around-full.awiki.org

Funções da API:

- GET /users/ = Acessa todos os usuários do banco de dados
- GET /users/:id = Acessa um usuário específico do banco de dados
- POST /users/ = Adiciona um novo usuário
- PATCH /users/me = Modifica o perfíl do usuário
- DELETE /users/me/avatar = Deleta o usuário

- GET /cards/ = Retorna todos os cartões do banco de dados
- DELETE /cards/cardId = Deleta um cartão específico
- POST /cards/ = Adiciona um novo cartão
- PUT /cards/cardId/likes = Função de curtir um cartão
- DELETE /cards/cardId/likes Função de descurtir um cartão

Link de vídeo demonstrativo: https://youtu.be/m_HzaOmqyyA
(No vídeo, o projeto está sendo rodado localmente, mas as funcionalidades são as mesmas no servidor)