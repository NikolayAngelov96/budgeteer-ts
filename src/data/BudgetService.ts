import { Budget } from "./models";
import { DataService } from "./Service";

type BudgetData = {
  month: string;
  income: number;
  budget: number;
};

export class BudgetService extends DataService<Budget, BudgetData> {
  protected parseRecord(data: any): Budget {
    const record = new Budget(data.id, data.month, data.income, data.budget);

    return record;
  }
  protected validate(data: any) {
    if (typeof data.month != "string") {
      throw new TypeError('Incompatible record. Invalid property "month"');
    }
    if (typeof data.income != "number") {
      throw new TypeError('Incompatible record. Invalid property "income"');
    }
    if (typeof data.budget != "number") {
      throw new TypeError('Incompatible record. Invalid property "budget"');
    }
  }
}
