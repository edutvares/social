import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { CurtidaService } from "../../core/services/curtida.service";
import { SeguidorService } from "../../core/services/seguidor.service";

interface SeguidoresRoutesOptions extends FastifyPluginOptions {
  service: SeguidorService;
}

async function seguidorRoutes(
  fastify: FastifyInstance,
  options: SeguidoresRoutesOptions
) {
  fastify.post("/", async (req, reply) => {
    const { seguidor_id, seguido_id } = req.body as {
      seguidor_id: number;
      seguido_id: number;
    };
    return reply
      .code(201)
      .send(await options.service.seguir(seguidor_id, seguido_id));
  });
}

export default seguidorRoutes;
