import { generateId } from "../utils";

export type RecordId = string;

export interface Record {
  id: string;
}

export interface Storage {
  getAll(collectionName: string): Promise<Record[]>;
  getById(collectionName: string, id: RecordId): Promise<Record>;
  create(collectionName: string, data: any): Promise<Record>;
  update(collectionName: string, id: RecordId, data: any): Promise<Record>;
  delete(collectionName: string, id: RecordId): Promise<void>;
}

export class LocalStorage implements Storage {
  async getAll(collectionName: string): Promise<Record[]> {
    return JSON.parse(localStorage.getItem(collectionName) || null) || [];
  }

  async getById(collectionName: string, id: string): Promise<Record> {
    const items = await this.getAll(collectionName);
    const result = items.find((r) => r.id == id);

    return result;
  }

  async create(collectionName: string, data: any): Promise<Record> {
    const items = await this.getAll(collectionName);
    const record = Object.assign({}, data, { id: generateId() });

    items.push(record);

    localStorage.setItem(collectionName, JSON.stringify(items));

    return record;
  }

  async update(collectionName: string, id: string, data: any): Promise<Record> {
    const items = await this.getAll(collectionName);

    const indexOfItem = this.findIndexOfItem(items, id);

    const record = Object.assign({}, data, { id });

    items[indexOfItem] = record;

    localStorage.setItem(collectionName, JSON.stringify(items));

    return record;
  }

  async delete(collectionName: string, id: string): Promise<void> {
    const items = await this.getAll(collectionName);

    const indexOfItem = this.findIndexOfItem(items, id);

    items.splice(indexOfItem, 1);

    localStorage.setItem(collectionName, JSON.stringify(items));
  }

  private findIndexOfItem(collection: Record[], id: string): number {
    const index = collection.findIndex((r) => r.id == id);

    if (index == -1) {
      throw new ReferenceError(`No record with id ${id} found.`);
    }

    return index;
  }
}
