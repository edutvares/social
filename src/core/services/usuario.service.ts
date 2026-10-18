import { Usuario } from "../domain/entities/usuario";
import { IUsuarioRepository } from "../domain/repository/IUsuarioRepository";
import { Invalido } from "../erros";

export class UsuarioService {
  private usuarioRepository: IUsuarioRepository;

  constructor(usuarioRepository: IUsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async criarUsuario(nome: string, email: string) {
    if (!nome?.trim() || !email?.trim())
      throw new Invalido("nome e e-mail são obrigatórios");
    try {
      const usuario = { nome, email } as Usuario;
      const id = await this.usuarioRepository.insert(usuario);
      return this.usuarioRepository.findById(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  buscarUsuario(id: number) {
    if (!id) {
      throw new Invalido("É obrigatório informar o id do usuário.");
    }
    try {
      return this.usuarioRepository.findById(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
