import { Collection } from "./Collection";
import { Record, RecordId } from "./Storage";

export interface Service<T, TData> {
  getAll(): Promise<T[]>;
  getById(id: RecordId): Promise<T>;
  create(data: TData): Promise<T>;
  update(id: RecordId, data: TData): Promise<T>;
  delete(id: RecordId): Promise<void>;
}

export abstract class DataService<T, TData> implements Service<T, TData> {
  private collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  async getAll(): Promise<T[]> {
    const items = (await this.collection.getAll()).map((r) =>
      this.parseRecord(r)
    );

    return items;
  }

  async getById(id: RecordId): Promise<T> {
    const item = await this.collection.getById(id);

    return this.parseRecord(item);
  }

  async create(data: TData): Promise<T> {
    this.validate(data);

    const record = await this.collection.create(data);

    return this.parseRecord(record);
  }

  async update(id: RecordId, data: TData): Promise<T> {
    this.validate(data);

    const item = await this.collection.update(id, data);

    return this.parseRecord(item);
  }

  delete(id: RecordId): Promise<void> {
    return this.collection.delete(id);
  }

  protected abstract parseRecord(data: Record): T;

  protected abstract validate(data: any);
}
