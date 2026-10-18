import { Post } from "../entities/Post";
import { IRepository } from "./IRepository";

export interface IPostRepository extends IRepository<Post, number> {
  postsDoUsuario(id: number): Post[];
  postsDosSeguidos(idSeguidor: number): Promise<Post[]>;
}
