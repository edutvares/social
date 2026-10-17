import { db } from "./db.js";
import { Conflito, Invalido, NaoEncontrado } from "./erros.js";

export function criarUsuario(nome: string, email: string) {
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

// export function buscarUsuario(id: number) {
//   const u = db
//     .prepare("SELECT id, nome, email FROM usuario WHERE id = ?")
//     .get(id);
//   if (!u) throw new NaoEncontrado(`usuário ${id} não existe`);
//   return u as { id: number; nome: string; email: string };
// }

// export function postsDoUsuario(usuarioId: number) {
//   buscarUsuario(usuarioId); // garante 404 se o usuário não existe
//   return db
//     .prepare(
//       "SELECT id, autor_id AS autorId, texto, criado_em AS criadoEm FROM post WHERE autor_id = ? ORDER BY id DESC"
//     )
//     .all(usuarioId);
// }
