import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ComentarioService } from "../../core/services/comentario.service";

interface ComentarioRoutesOptions extends FastifyPluginOptions {
  service: ComentarioService;
}

async function comentarioRoutes(
  fastify: FastifyInstance,
  options: ComentarioRoutesOptions
) {
  fastify.post("/", async (req, reply) => {
    const { usuario_id, post_id, texto } = req.body as {
      usuario_id: number;
      post_id: number;
      texto: string;
    };
    return reply
      .code(201)
      .send(await options.service.comentar(usuario_id, post_id, texto));
  });
}

export default comentarioRoutes;
