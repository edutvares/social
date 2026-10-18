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

  postsDoUsuario(id: number): Post[] {
    if (!id) throw new Invalido("Id do usuário é ogrigatório.");
    try {
      return this.repository.postsDoUsuario(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  obterPorId(id: number): Post | null {
    if (!id) throw new Invalido("Id do post é ogrigatório.");
    try {
      return this.repository.findById(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  postsDosSeguidos(idSeguidor: number) {
    if (!idSeguidor) throw new Invalido("Id do seguidor é ogrigatório.");
    try {
      return this.repository.postsDosSeguidos(idSeguidor);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
