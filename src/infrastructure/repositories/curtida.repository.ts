import { ICurtidaRepository } from "../../core/domain/repository/ICurtidaRepository";
import { DatabaseConnection } from "../database/connection";
import { traduzirErroSqlite } from "../database/erros-sqlite";

export class CurtidaRepository implements ICurtidaRepository {
  constructor(private db: DatabaseConnection) {}

  async curtir(usuarioId: number, postId: number): Promise<void> {
    try {
      this.db
        .prepare("INSERT INTO curtida (usuario_id, post_id) VALUES (?, ?)")
        .run(usuarioId, postId);
    } catch (e) {
      traduzirErroSqlite(e);
    }
  }

  async contarDoPost(postId: number): Promise<number> {
    const row = this.db
      .prepare("SELECT COUNT(*) AS total FROM curtida WHERE post_id = ?")
      .get(postId) as { total: number };
    return row.total;
  }
}
