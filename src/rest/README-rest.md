# REST (JSON)

API REST com JSON feita com Fastify. Endereço base: `http://localhost:3000`.

## Como executar

Da raiz do projeto:

```bash
npm install
npm run rest
```

Na pasta tem um arquivo (acredito que o nome confuso pode dificultar o entendimento do motivo de sua existencia) "TACA_ISSO_AQUI_NO_BRUNO.yml". Esse arquivo tem os exemplos de requisições http para testar.

## Erros

Os erros vêm com o status HTTP e um corpo `{"erro":"mensagem"}`: `400` dados inválidos, `404`
usuário ou post inexistente, `409` registro repetido (e-mail, curtida ou seguida).

## O que o REST faz melhor que o GraphQL neste domínio

Os comandos (criar, curtir, seguir) são operações diretas, com rota e status HTTP próprios
(`201`, `404`, `409`), fáceis de chamar e de tratar sem ler o corpo da resposta.
