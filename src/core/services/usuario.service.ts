import { Usuario } from "../domain/entities/usuario";
import { IUsuarioRepository } from "../domain/repository/IUsuarioRepository";
import { Invalido } from "../erros";

export class UsuarioService {
  private usuarioRepository: IUsuarioRepository;

  constructor(usuarioRepository: IUsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async criarUsuario(nome: string, email: string) {
    console.log("Chamou aqui");

    if (!nome?.trim() || !email?.trim())
      throw new Invalido("nome e e-mail são obrigatórios");
    try {
      const usuario = { nome, email } as Usuario;
      return await this.usuarioRepository.insert(usuario);
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
