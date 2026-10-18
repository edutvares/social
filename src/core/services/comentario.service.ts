import { Comentario } from "../domain/entities/Comentario";
import { IComentarioRepository } from "../domain/repository/IComentarioRepository";
import { Invalido } from "../erros";

export class ComentarioService {
  private repository: IComentarioRepository;

  constructor(repository: IComentarioRepository) {
    this.repository = repository;
  }

  async comentar(usuario_id: number, post_id: number, texto: string) {
    console.log("Chamou aqui");

    if (!usuario_id || !post_id || !texto?.trim())
      throw new Invalido(
        "Id do usuário, id do post e texto do comentario são obrigatórios"
      );
    try {
      const post = { usuario_id, post_id, texto } as Comentario;
      return await this.repository.insert(post);
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const tx = db.transaction(() => {
    //     const r = db
    //       .prepare("INSERT INTO usuario (nome, email) VALUES (?, ?)")
    //       .run(nome, email);
    //     db.prepare("INSERT INTO perfil (usuario_id) VALUES (?)").run(
    //       r.lastInsertRowid
    //     );
    //     return Number(r.lastInsertRowid);
    //   });
    //   return "TESTE";
    //   // return buscarUsuario(tx());
    // } catch (e: any) {
    //   if (e.code === "SQLITE_CONSTRAINT_UNIQUE")
    //     throw new Conflito("email já cadastrado");
    //   throw e;
    // }
  }
}
