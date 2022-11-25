import { Collection } from "./data/Collection";
import { ExpenseService, ExpenseData } from "./data/ExpenseService";
import { LocalStorage } from "./data/Storage";
import { Editor } from "./dom/Editor";

const form = document.getElementById("new-expense") as HTMLFormElement;

const storage = new LocalStorage();
const collection = new Collection(storage, "expenses");

const expenseService = new ExpenseService(collection);

const editor = new Editor(form, onSubmitHandler);

const cancelBtn = document.querySelector(
  '.centered [type="button"]'
) as HTMLButtonElement;

cancelBtn.addEventListener("click", () => {
  editor.clear();
});

async function onSubmitHandler({ date, amount, category, name }: ExpenseData) {
  const parsedDate = new Date(date);

  amount = Number(amount);

  if (Number.isNaN(parsedDate.getDate())) {
    throw new TypeError("Not a valid date");
  }

  if (Number.isNaN(amount)) {
    throw new Error("Amount must be a number");
  }

  const record = await expenseService.create({
    date: parsedDate,
    amount,
    category,
    name,
  });

  editor.clear();
  console.log(record);
}

async function start() {
  console.log(await expenseService.getAll());
}

start();
