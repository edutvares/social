import { Invalido } from "../erros";

export class UsuarioService {
  criarUsuario(nome: string, email: string) {
    console.log("Chamou aqui");

    if (!nome?.trim()) throw new Invalido("nome é obrigatórios");
    try {
      return "PASSOU";
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
