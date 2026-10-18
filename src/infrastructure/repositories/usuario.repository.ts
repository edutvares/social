import { Usuario } from "../../core/domain/entities/usuario";
import { IUsuarioRepository } from "../../core/domain/repository/IUsuarioRepository";
import { DatabaseConnection } from "../database/connection";
import { GenericRepository } from "./generic.repository";

export class UsuarioRepository
  extends GenericRepository<Usuario>
  implements IUsuarioRepository
{
  tableName = "usuario";

  constructor(db: DatabaseConnection) {
    super(db);
  }
}
