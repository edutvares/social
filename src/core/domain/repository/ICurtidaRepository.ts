export interface ICurtidaRepository {
  curtir(usuarioId: number, postId: number): Promise<void>;
  contarDoPost(postId: number): Promise<number>;
}
