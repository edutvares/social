import { Post } from "../domain/entities/Post";
import { IPostRepository } from "../domain/repository/IPostRepository";
import { Invalido } from "../erros";

export class PostService {
  private repository: IPostRepository;

  constructor(repository: IPostRepository) {
    this.repository = repository;
  }

  async criarPost(usuario_id: number, texto: string) {
    console.log("Chamou aqui");

    if (!usuario_id || !texto?.trim())
      throw new Invalido("Id do usuário e texto do post são obrigatórios");
    try {
      const post = { autor_id: usuario_id, texto } as Post;
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
