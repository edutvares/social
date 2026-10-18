import { Usuario } from "../../domain/entities/usuario";
import { IRepository } from "./IRepository";

export interface IUsuarioRepository extends IRepository<Usuario, number> {}
