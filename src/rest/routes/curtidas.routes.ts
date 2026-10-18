import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { CurtidaService } from "../../core/services/curtida.service";

interface CurtidasRoutesOptions extends FastifyPluginOptions {
  service: CurtidaService;
}

async function curtidaRoutes(
  fastify: FastifyInstance,
  options: CurtidasRoutesOptions
) {
  fastify.post("/", async (req, reply) => {
    const { usuario_id, post_id } = req.body as {
      usuario_id: number;
      post_id: number;
    };
    return reply
      .code(201)
      .send(await options.service.curtir(usuario_id, post_id));
  });
}

export default curtidaRoutes;
