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
      const id = await this.repository.insert(post);
      return this.repository.findById(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
