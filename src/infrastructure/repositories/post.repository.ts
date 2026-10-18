import { Post } from "../../core/domain/entities/Post";
import { DatabaseConnection } from "../database/connection";
import { GenericRepository } from "./generic.repository";

export class PostRepository extends GenericRepository<Post> {
  tableName = "post";

  constructor(db: DatabaseConnection) {
    super(db);
  }
}
