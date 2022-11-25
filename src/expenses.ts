import { Collection } from "./data/Collection";
import { ExpenseService } from "./data/ExpenseService";
import { LocalStorage } from "./data/Storage";

async function start() {
  const storage = new LocalStorage();
  const collection = new Collection(storage, "expenses");

  const expenseService = new ExpenseService(collection);

  console.log(await expenseService.getAll());

  const record = await expenseService.create({
    amount: 60,
    category: "1",
    date: new Date(),
    name: "test",
  });

  console.log(record);

  console.log(await expenseService.getAll());
}

start();
