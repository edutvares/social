import { GraphQLError } from "graphql";
import { Conflito, Invalido, NaoEncontrado } from "../core/erros.js";

export function traduzir(e: unknown): unknown {
  const code =
    e instanceof NaoEncontrado
      ? "NOT_FOUND"
      : e instanceof Invalido
      ? "BAD_INPUT"
      : e instanceof Conflito
      ? "CONFLICT"
      : null;

  return code
    ? new GraphQLError((e as Error).message, { extensions: { code } })
    : e; // erro desconhecido: o Yoga mascara e registra
}

// Envolve um resolver para traduzir os erros dele, sem repetir try/catch
export function comTraducao<A extends unknown[], R>(
  fn: (...args: A) => R | Promise<R>
) {
  return async (...args: A): Promise<R> => {
    try {
      return await fn(...args);
    } catch (e) {
      throw traduzir(e);
    }
  };
}
