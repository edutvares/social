import Fastify from "fastify";
import { Conflito, Invalido, NaoEncontrado } from "../core/erros.js";
import usuarioRoutes from "./routes/usuarios.routes.js";
import postRoutes from "./routes/posts.routes.js";
import comentarioRoutes from "./routes/comentario.routes.js";
import { services } from "../container.js";
import curtidaRoutes from "./routes/curtidas.routes.js";
import seguidorRoutes from "./routes/seguidores.routes.js";

const app = Fastify({
  logger: true,
});

app.setErrorHandler((err, _req, reply) => {
  if (err instanceof NaoEncontrado)
    return reply.code(404).send({ erro: err.message });
  if (err instanceof Invalido)
    return reply.code(400).send({ erro: err.message });
  if (err instanceof Conflito)
    return reply.code(409).send({ erro: err.message });
  reply.code(500).send({ erro: "erro interno" });
});

// Usuarios
app.register(usuarioRoutes, {
  prefix: "usuarios",
  usuarioService: services.usuarios,
});

// Posts
app.register(postRoutes, { prefix: "posts", service: services.posts });

// Comentarios
app.register(comentarioRoutes, {
  prefix: "comentarios",
  service: services.comentarios,
});

// Curtidas
app.register(curtidaRoutes, { prefix: "curtidas", service: services.curtidas });

// Seguidor
app.register(seguidorRoutes, {
  prefix: "seguidores",
  service: services.seguidor,
});

app.get("/ping", async (req, res) => {
  console.log("ping");
  res.send("pong");
});

app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
