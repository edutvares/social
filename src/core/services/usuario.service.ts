import { DatabaseConnection } from "../../infrastructure/database/connection";
import { Invalido } from "../erros";

export class UsuarioService {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  criarUsuario(nome: string, email: string) {
    console.log("Chamou aqui");

    if (!nome?.trim()) throw new Invalido("nome é obrigatórios");
    try {
      console.log(this.db);
      return `Cadastro do usuário ${nome}`;
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const tx = db.transaction(() => {
    //     const r = db
    //       .prepare("INSERT INTO usuario (nome, email) VALUES (?, ?)")
    //       .run(nome, email);
    //     db.prepare("INSERT INTO perfil (usuario_id) VALUES (?)").run(
    //       r.lastInsertRowid
    //     );
    //     return Number(r.lastInsertRowid);
    //   });
    //   return "TESTE";
    //   // return buscarUsuario(tx());
    // } catch (e: any) {
    //   if (e.code === "SQLITE_CONSTRAINT_UNIQUE")
    //     throw new Conflito("email já cadastrado");
    //   throw e;
    // }
  }
}
