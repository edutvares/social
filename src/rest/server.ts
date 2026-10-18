import Fastify from "fastify";
import { Conflito, Invalido, NaoEncontrado } from "../core/erros.js";
import usuarioRoutes from "./routes/usuarios.routes.js";
import { UsuarioService } from "../core/services/usuario.service.js";
import { createDatabase } from "../infrastructure/database/connection.js";
import { UsuarioRepository } from "../infrastructure/repositories/usuario.repository.js";
import { PostRepository } from "../infrastructure/repositories/post.repository.js";
import { PostService } from "../core/services/post.service.js";
import postRoutes from "./routes/posts.routes.js";
import { ComentarioRepository } from "../infrastructure/repositories/comentario.repository.js";
import { ComentarioService } from "../core/services/comentario.service.js";
import comentarioRoutes from "./routes/comentario.routes.js";

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

const db = createDatabase({
  onCreate: () => {
    console.log("Banco de dados criado");
  },
});

// Usuarios
const usuarioRepository = new UsuarioRepository(db);
const usuarioService = new UsuarioService(usuarioRepository);
app.register(usuarioRoutes, { prefix: "usuarios", usuarioService });

// Posts
const postRepository = new PostRepository(db);
const postService = new PostService(postRepository);
app.register(postRoutes, { prefix: "posts", service: postService });

// Comentarios
const comentarioRepository = new ComentarioRepository(db);
const comentarioService = new ComentarioService(comentarioRepository);
app.register(comentarioRoutes, {
  prefix: "comentarios",
  service: comentarioService,
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
