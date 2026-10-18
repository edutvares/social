# POSTSBOOK XD

`Discussões sobre o nome não são aceitas. A ideia foi do meu sobrinho de 8 anos kkkkkkkkk`

O domínio de rede social (usuário, post, comentário, curtida e seguidores) é exposto em dois
protocolos: **REST (JSON)** e **GraphQL**. Os dois estão no mesmo projeto, usam o mesmo banco
SQLite e as mesmas regras de negócio (`src/core`), e cada um tem a sua pasta e o seu README.

## Estrutura

```
/
├── README.md
├── src/
│   ├── core/            regras de negócio (compartilhadas)
│   ├── infrastructure/  banco SQLite e repositórios
│   ├── rest/            REST + JSON (README próprio)
│   └── graphql/         GraphQL (README próprio)
└── package.json
```

## Como executar

Requisito: Node.js.

```bash
npm install
npm run rest       # REST em http://localhost:3000
npm run graphql    # GraphQL em http://localhost:4000/graphql (outro terminal)
```

O banco `exemplo.db` é criado sozinho na primeira execução. Rode os dois comandos da raiz do
projeto, para usarem o mesmo arquivo.

## Comparação final

### Endpoint

Rest possui um por recuso e o graphql tem apenas um que o cliente consegue consultar apenas o que realmente precisa

### Formato da resposta

Rest é definido pelo servidor e no graphql é definido pelo cliente

**O que o REST faz melhor neste domínio:** os comandos (criar, curtir, seguir) são operações
diretas, com rota e status HTTP próprios, fáceis de chamar e de tratar.

**O que o GraphQL faz melhor neste domínio:** uma única consulta traz o usuário com posts,
seguidores e seguindo (ou o feed já com o autor), e o cliente escolhe os campos.

**Conclusão:** como os dois reaproveitam os mesmos _services_, só a camada de protocolo muda.
O GraphQL compensa nas telas que juntam vários dados (perfil, feed), e o REST é mais simples
para comandos e consultas de um recurso só.
