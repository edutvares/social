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
        return await ctx.services.posts.postsDosSeguidos(Number(usuarioId));
      }
    ),
  },

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
