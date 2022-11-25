export class Expense {
  constructor(
    public id: string,
    public date: Date,
    public name: string,
    public category: string,
    public amount: number
  ) {}
}
