import { Usuario } from "../../core/domain/entities/usuario";
import { DatabaseConnection } from "../database/connection";
import { GenericRepository } from "./generic.repository";

export class UsuarioRepository extends GenericRepository<Usuario> {
  tableName = "usuario";

  constructor(db: DatabaseConnection) {
    super(db);
  }
}
