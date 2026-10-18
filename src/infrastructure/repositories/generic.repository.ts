import { IRepository } from "../../core/domain/repository/IRepository";
import { Conflito, NaoEncontrado, Invalido } from "../../core/erros";
import { DatabaseConnection } from "../database/connection";
import { traduzirErroSqlite } from "../database/erros-sqlite";

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

    try {
      const result = insert.run(...values);
      return Number(result.lastInsertRowid) as TId;
    } catch (e: any) {
      traduzirErroSqlite(e);
    }
  }

  findById(id: TId): T | null {
    const sql = `
      SELECT * FROM \`${this.tableName}\`
      WHERE id = ?
    `;

    const select = this.db.prepare(sql);
    const response = select.get(id) as T | undefined;

    return response ?? null;
  }
}
