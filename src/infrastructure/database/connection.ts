import Database from "better-sqlite3";

export function createDatabase() {
  const db = new Database("exemplo.db");

  db.pragma("foreign_keys = ON");

  db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
  )
`);

  return db;
}

export type DatabaseConnection = ReturnType<typeof createDatabase>;
