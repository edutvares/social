# GraphQL

API GraphQL feita com GraphQL Yoga. Endpoint único: `http://localhost:4000/graphql`. Abrir
esse endereço no navegador mostra uma interface para testar as consultas.

## Como executar

Da raiz do projeto:

```bash
npm install
npm run graphql
```

## O que o GraphQL faz melhor que o REST neste domínio

Uma única consulta traz o usuário com seus posts, seguidores e seguindo (ou o feed já com o
autor de cada post), e o cliente escolhe os campos, o que no REST exige várias requisições.
