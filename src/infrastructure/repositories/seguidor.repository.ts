import { Usuario } from "../../core/domain/entities/Usuario";
import { ISeguidorRepository } from "../../core/domain/repository/ISeguidorRepository";
import { DatabaseConnection } from "../database/connection";
import { traduzirErroSqlite } from "../database/erros-sqlite";

export class SeguidorRepository implements ISeguidorRepository {
  constructor(private db: DatabaseConnection) {}

  async seguir(seguidorId: number, seguidoId: number) {
    try {
      this.db
        .prepare("INSERT INTO seguidor (seguidor_id, seguido_id) VALUES (?, ?)")
        .run(seguidorId, seguidoId);
    } catch (e) {
      traduzirErroSqlite(e);
    }
  }

  async seguidoresDe(usuarioId: number) {
    return this.db
      .prepare(
        `SELECT u.id, u.nome, u.email
                FROM seguidor s JOIN usuario u ON u.id = s.seguidor_id
                WHERE s.seguido_id = ?`
      )
      .all(usuarioId) as Usuario[];
  }

  async seguindoDe(usuarioId: number) {
    return this.db
      .prepare(
        `SELECT u.id, u.nome, u.email
                FROM seguidor s JOIN usuario u ON u.id = s.seguido_id
                WHERE s.seguidor_id = ?`
      )
      .all(usuarioId) as Usuario[];
  }
}
