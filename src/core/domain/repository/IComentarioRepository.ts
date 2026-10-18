import { Comentario } from "../entities/Comentario";
import { IRepository } from "./IRepository";

export interface IComentarioRepository
  extends IRepository<Comentario, number> {}
