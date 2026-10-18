import { Post } from "../../core/domain/entities/Post";
import { IPostRepository } from "../../core/domain/repository/IPostRepository";
import { DatabaseConnection } from "../database/connection";
import { GenericRepository } from "./generic.repository";

export class PostRepository
  extends GenericRepository<Post>
  implements IPostRepository
{
  tableName = "post";

  constructor(db: DatabaseConnection) {
    super(db);
  }

  async postsDosSeguidos(idSeguidor: number): Promise<Post[]> {
    const sql = `
    SELECT p.*
    FROM \`${this.tableName}\` p
    INNER JOIN seguidor s ON s.seguido_id = p.autor_id
    WHERE s.seguidor_id = ?
    ORDER BY p.criado_em DESC, p.id DESC
  `;
    return this.db.prepare(sql).all(idSeguidor) as Post[];
  }

  postsDoUsuario(id: number): Post[] {
    const sql = `
      SELECT * FROM \`${this.tableName}\`
      WHERE autor_id = ?
    `;

    const select = this.db.prepare(sql);
    const response = select.all(id) as Post[];

    return response ?? null;
  }
}
