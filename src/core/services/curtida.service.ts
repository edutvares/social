import { ICurtidaRepository } from "../domain/repository/ICurtidaRepository";
import { Invalido } from "../erros";

export class CurtidaService {
  constructor(private repository: ICurtidaRepository) {}

  async curtir(usuarioId: number, postId: number) {
    if (!usuarioId || !postId)
      throw new Invalido("id do usuário e id do post são obrigatórios");
    await this.repository.curtir(usuarioId, postId);
  }

  async contarDoPost(postId: number) {
    return this.repository.contarDoPost(postId);
  }
}
