export class Expense {
  constructor(
    public id: string,
    public date: Date,
    public name: string,
    public category: string,
    public amount: number
  ) {}
}

export class Budget {
  constructor(
    public id: string,
    public month: string,
    public income: number,
    public budget: number
  ) {}
}
