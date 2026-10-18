export const typeDefs = /* GraphQL */ `
  type Usuario {
    id: ID!
    nome: String!
    email: String!
    posts: [Post!]!
    seguidores: [Usuario!]!
    seguindo: [Usuario!]!
  }

  type Post {
    id: ID!
    texto: String!
    criadoEm: String!
    autor: Usuario!
    comentarios: [Comentario!]!
    totalCurtidas: Int!
  }

  type Comentario {
    id: ID!
    texto: String!
    criadoEm: String!
    autor: Usuario!
    post: Post!
  }

  type Query {
    usuario(id: ID!): Usuario
    post(id: ID!): Post
    feed(usuarioId: ID!): [Post!]!
  }
`;
// criarUsuario(nome: String!, email: String!): Usuario!
// criarPost(usuarioId: ID!, texto: String!): Post!
// comentar(usuarioId: ID!, postId: ID!, texto: String!): Comentario!
// curtir(usuarioId: ID!, postId: ID!): Post!
// seguir(usuarioId: ID!, alvoId: ID!): Boolean!

// post(id: ID!): Post
//     feed(usuarioId: ID!): [Post!]!
