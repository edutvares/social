import type { Ctx } from "./context.js";
import { comTraducao } from "./erros.js";

export const resolvers = {
  Query: {
    usuario: comTraducao((_: unknown, { id }: { id: string }, ctx: Ctx) =>
      ctx.services.usuarios.buscarUsuario(Number(id))
    ),
    post: comTraducao((_: unknown, { id }: { id: string }, ctx: Ctx) =>
      ctx.services.posts.obterPorId(Number(id))
    ),
    feed: comTraducao(
      async (_: unknown, { usuarioId }: { usuarioId: string }, ctx: Ctx) => {
        const posts = await ctx.services.posts.postsDosSeguidos(
          Number(usuarioId)
        );
        console.log("resolver:", posts[0]);
        return posts;
      }
    ),
  },

  // Mutation: {
  //   criarUsuario: comTraducao(
  //     (_: unknown, a: { nome: string; email: string }, ctx: Ctx) =>
  //       ctx.services.usuarios.criarUsuario(a.nome, a.email)
  //   ),

  //   criarPost: comTraducao(
  //     (_: unknown, a: { usuarioId: string; texto: string }, ctx: Ctx) =>
  //       ctx.services.posts.criarPost(Number(a.usuarioId), a.texto)
  //   ),
  //   // comentar, curtir, seguir: mesmo molde
  // },

  // Resolvers de campo: só rodam se o cliente pedir esse campo
  // Post: {
  //   criadoEm: (post: { criado_em: string }) => post.criado_em,
  //   autor: (post: { autor_id: number }, _: unknown, ctx: Ctx) =>
  //     ctx.services.usuarios.buscarUsuario(post.autor_id),
  // },

  Usuario: {
    posts: (u: { id: number }, _: unknown, ctx: Ctx) =>
      ctx.services.posts.postsDoUsuario(u.id),
    seguidores: (u: { id: number }, _: unknown, ctx: Ctx) =>
      ctx.services.seguidor.seguidoresDe(u.id),
    seguindo: (u: { id: number }, _: unknown, ctx: Ctx) =>
      ctx.services.seguidor.seguindoDe(u.id),
  },

  Post: {
    criadoEm: (post: { criado_em: string }) => post.criado_em,
    autor: (post: { autor_id: number }, _: unknown, ctx: Ctx) =>
      ctx.services.usuarios.buscarUsuario(post.autor_id),
    comentarios: (post: { id: number }, _: unknown, ctx: Ctx) =>
      ctx.services.comentarios.obterPorPost(post.id),
    totalCurtidas: (post: { id: number }, _: unknown, ctx: Ctx) =>
      ctx.services.curtidas.contarDoPost(post.id),
  },

  Comentario: {
    criadoEm: (comentario: { criado_em: string }) => comentario.criado_em,
  },
};
