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
      const comentario = { usuario_id, post_id, texto } as Comentario;
      const id = await this.repository.insert(comentario);
      return this.repository.findById(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  obterPorPost(idPost: number) {
    if (!idPost) throw new Invalido("Id do post é obrigatório");
    try {
      return this.repository.obterPorPost(idPost);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
