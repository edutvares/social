import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { PostService } from "../../core/services/post.service";

interface PostRoutesOptions extends FastifyPluginOptions {
  service: PostService;
}

async function postRoutes(
  fastify: FastifyInstance,
  options: PostRoutesOptions
) {
  fastify.post("/", async (req, reply) => {
    const { usuario_id, texto } = req.body as {
      usuario_id: number;
      texto: string;
    };
    return reply
      .code(201)
      .send(await options.service.criarPost(usuario_id, texto));
  });
}

export default postRoutes;
