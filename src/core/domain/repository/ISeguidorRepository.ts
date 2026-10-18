import { Usuario } from "../entities/Usuario";

export interface ISeguidorRepository {
  seguir(seguidorId: number, seguidoId: number): Promise<void>;
  seguidoresDe(usuarioId: number): Promise<Usuario[]>;
  seguindoDe(usuarioId: number): Promise<Usuario[]>;
}
