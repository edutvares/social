import { FastifyInstance } from "fastify";
import { criarUsuario } from "../../core/usuarios";

async function usuarioRoutes(fastify: FastifyInstance, options: Object) {
  fastify.post("/", async (req, reply) => {
    const { nome, email } = req.body as { nome: string; email: string };
    return reply.code(201).send(criarUsuario(nome, email));
  });

  fastify.post("/", async (req, reply) => {
    const { nome, email } = req.body as { nome: string; email: string };
    return reply.code(201).send(criarUsuario(nome, email));
  });
}

export default usuarioRoutes;

// app.post("/usuarios", async (req, reply) => {
//   const { nome, email } = req.body as { nome: string; email: string };
//   return reply.code(201).send(criarUsuario(nome, email));
// });

// app.get("/usuarios/:id", async (req) =>
//   buscarUsuario(Number((req.params as any).id))
// );

// app.get("/usuarios/:id/posts", async (req) =>
//   postsDoUsuario(Number((req.params as any).id))
// );
