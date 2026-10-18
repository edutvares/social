import { Conflito, Invalido, NaoEncontrado } from "../../core/erros.js";

export function traduzirErroSqlite(e: any): never {
  switch (e?.code) {
    case "SQLITE_CONSTRAINT_UNIQUE":
    case "SQLITE_CONSTRAINT_PRIMARYKEY":
      throw new Conflito("registro já existe");
    case "SQLITE_CONSTRAINT_FOREIGNKEY":
      throw new NaoEncontrado("registro referenciado não existe");
    case "SQLITE_CONSTRAINT_CHECK":
      throw new Invalido("dados violam uma regra de integridade");
    default:
      throw e;
  }
}
