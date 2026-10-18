import { Usuario } from "../entities/Usuario";
import { IRepository } from "./IRepository";

export interface IUsuarioRepository extends IRepository<Usuario, number> {}
