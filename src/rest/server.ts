import Fastify from "fastify";
import { Conflito, Invalido, NaoEncontrado } from "../core/erros.js";
import usuarioRoutes from "./routes/usuarios.routes.js";
import { UsuarioService } from "../core/services/usuario.service.js";
import { createDatabase } from "../infrastructure/database/connection.js";

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

const db = createDatabase();
console.log("Banco de dados criado");
// TODO - O db vai ser passado para o repository no futuro
const usuarioService = new UsuarioService(db);

app.register(usuarioRoutes, { prefix: "usuarios", usuarioService });

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
