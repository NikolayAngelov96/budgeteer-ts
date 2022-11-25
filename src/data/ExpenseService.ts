import { Expense } from "./models";
import { DataService } from "./Service";

export type ExpenseData = {
  date: Date;
  name: string;
  category: string;
  amount: number;
};

export class ExpenseService extends DataService<Expense, ExpenseData> {
  protected parseRecord(data: any): Expense {
    const record = new Expense(
      data.id,
      new Date(data.date),
      data.name,
      data.category,
      Number(data.amount)
    );

    return record;
  }

  protected validate(data: any) {
    if (data.date instanceof Date == false) {
      throw new TypeError('Incompatible record. Invalid property "date"');
    }
    if (typeof data.name != "string") {
      throw new TypeError('Incompatible record. Invalid property "name"');
    }
    if (typeof data.category != "string") {
      throw new TypeError('Incompatible record. Invalid property "category"');
    }
    if (typeof data.amount != "number") {
      throw new TypeError('Incompatible record. Invalid property "amount"');
    }
  }
}
