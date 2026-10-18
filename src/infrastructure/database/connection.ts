import Database from "better-sqlite3";

export function createDatabase({ onCreate }: { onCreate: () => void }) {
  const db = new Database("exemplo.db");

  db.pragma("foreign_keys = ON");
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS usuario (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      nome  TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS perfil (
      usuario_id INTEGER PRIMARY KEY REFERENCES usuario(id) ON DELETE CASCADE,
      bio        TEXT
    );

    CREATE TABLE IF NOT EXISTS post (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      autor_id  INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
      texto     TEXT NOT NULL,
      criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS comentario (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
      post_id    INTEGER NOT NULL REFERENCES post(id) ON DELETE CASCADE,
      texto      TEXT NOT NULL,
      criado_em  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS curtida (
      usuario_id INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
      post_id    INTEGER NOT NULL REFERENCES post(id) ON DELETE CASCADE,
      PRIMARY KEY (usuario_id, post_id)
    );

    CREATE TABLE IF NOT EXISTS seguidor (
      seguidor_id INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
      seguido_id  INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
      PRIMARY KEY (seguidor_id, seguido_id),
      CHECK (seguidor_id <> seguido_id)
    );

    -- Índices para as consultas (a PK composta já cobre a busca por seguidor_id / usuario_id)
    CREATE INDEX IF NOT EXISTS idx_post_autor        ON post(autor_id, id DESC);
    CREATE INDEX IF NOT EXISTS idx_comentario_post   ON comentario(post_id);
    CREATE INDEX IF NOT EXISTS idx_curtida_post      ON curtida(post_id);
    CREATE INDEX IF NOT EXISTS idx_seguidor_seguido  ON seguidor(seguido_id);
  `);

  onCreate();

  return db;
}

export type DatabaseConnection = ReturnType<typeof createDatabase>;
