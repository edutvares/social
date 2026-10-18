import { Comentario } from "../../core/domain/entities/Comentario";
import { DatabaseConnection } from "../database/connection";
import { GenericRepository } from "./generic.repository";

export class ComentarioRepository extends GenericRepository<Comentario> {
  tableName = "comentario";

  constructor(db: DatabaseConnection) {
    super(db);
  }
}
