import Database from "better-sqlite3";

export const db = new Database("rede.db");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS usuario (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome  TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  );
  CREATE TABLE IF NOT EXISTS perfil (
    usuario_id INTEGER PRIMARY KEY REFERENCES usuario(id),
    bio TEXT
  );
  CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    autor_id INTEGER NOT NULL REFERENCES usuario(id),
    texto TEXT NOT NULL,
    criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  -- comentario, curtida e seguidor: você desenha (veja as regras da resposta anterior)
`);
