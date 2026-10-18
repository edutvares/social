export interface IRepository<T, TId> {
  insert(entity: T): Promise<TId>;

  findById(id: TId): T | null;

  // findAll(): Promise<T[]>;

  // update(id: TId, entity: Partial<T>): Promise<void>;

  // delete(id: TId): Promise<void>;
}
