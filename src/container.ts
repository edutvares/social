import { ComentarioService } from "./core/services/comentario.service.js";
import { CurtidaService } from "./core/services/curtida.service.js";
import { PostService } from "./core/services/post.service.js";
import { SeguidorService } from "./core/services/seguidor.service.js";
import { UsuarioService } from "./core/services/usuario.service.js";
import { createDatabase } from "./infrastructure/database/connection.js";
import { ComentarioRepository } from "./infrastructure/repositories/comentario.repository.js";
import { CurtidaRepository } from "./infrastructure/repositories/curtida.repository.js";
import { PostRepository } from "./infrastructure/repositories/post.repository.js";
import { SeguidorRepository } from "./infrastructure/repositories/seguidor.repository.js";
import { UsuarioRepository } from "./infrastructure/repositories/usuario.repository.js";

const db = createDatabase({
  onCreate: () => {
    console.log("Banco de dados conectado");
  },
});

export const services = {
  usuarios: new UsuarioService(new UsuarioRepository(db)),
  posts: new PostService(new PostRepository(db)),
  comentarios: new ComentarioService(new ComentarioRepository(db)),
  curtidas: new CurtidaService(new CurtidaRepository(db)),
  seguidor: new SeguidorService(new SeguidorRepository(db)),
};
