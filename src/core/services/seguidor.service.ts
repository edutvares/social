import { ISeguidorRepository } from "../domain/repository/ISeguidorRepository";
import { Invalido } from "../erros";

export class SeguidorService {
  constructor(private repository: ISeguidorRepository) {}

  async seguir(usuarioId: number, alvoId: number) {
    if (!usuarioId || !alvoId)
      throw new Invalido("id do usuário e id do alvo são obrigatórios");
    if (usuarioId === alvoId)
      throw new Invalido("não é possível seguir a si mesmo");

    await this.repository.seguir(usuarioId, alvoId);
  }

  async seguidoresDe(usuarioId: number) {
    return this.repository.seguidoresDe(usuarioId);
  }

  async seguindoDe(usuarioId: number) {
    return this.repository.seguindoDe(usuarioId);
  }
}
