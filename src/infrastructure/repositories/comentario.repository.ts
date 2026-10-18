import { Comentario } from "../../core/domain/entities/Comentario";
import { IComentarioRepository } from "../../core/domain/repository/IComentarioRepository";
import { DatabaseConnection } from "../database/connection";
import { GenericRepository } from "./generic.repository";

export class ComentarioRepository
  extends GenericRepository<Comentario>
  implements IComentarioRepository
{
  tableName = "comentario";

  constructor(db: DatabaseConnection) {
    super(db);
  }

  obterPorPost(idPost: number) {
    return this.db
      .prepare(
        `SELECT *
                    FROM comentario
                    WHERE post_id = ?`
      )
      .all(idPost) as Comentario[];
  }
}
