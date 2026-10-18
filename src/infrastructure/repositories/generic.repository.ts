import { IRepository } from "../../core/domain/repository/IRepository";
import { DatabaseConnection } from "../database/connection";

export abstract class GenericRepository<T extends object, TId = number>
  implements IRepository<T, TId>
{
  db: DatabaseConnection;
  protected tableName: string | null = null;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  async insert(entity: T): Promise<TId> {
    const data = entity as Record<string, unknown>;

    const columns = Object.keys(data);
    const values = Object.values(data);

    if (columns.length === 0) {
      throw new Error("Não existem campos para inserir.");
    }

    const columnNames = columns.map((column) => `\`${column}\``).join(", ");

    const placeholders = columns.map(() => "?").join(", ");

    const sql = `
      INSERT INTO \`${this.tableName}\`
      (${columnNames})
      VALUES (${placeholders})
    `;

    const insert = this.db.prepare(sql);

    // Execute with individual arguments or an array
    const result = insert.run(...values);
    console.log("Resultado do insert => ", result);
    return result.lastInsertRowid as TId;
  }
}
