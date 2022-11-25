import { Collection } from "./data/Collection";
import { ExpenseService, ExpenseData } from "./data/ExpenseService";
import { Expense } from "./data/models";
import { LocalStorage } from "./data/Storage";
import { tr, td, button, span } from "./dom/dom";
import { Editor } from "./dom/Editor";
import { Table } from "./dom/Table";

const form = document.getElementById("new-expense") as HTMLFormElement;

const storage = new LocalStorage();
const collection = new Collection(storage, "expenses");

const expenseService = new ExpenseService(collection);

let table: Table;
start();
async function start() {
  const tableEl = document.querySelector("table");
  table = new Table(tableEl, createRow, compareRecords);

  hydrate(table);
}

async function hydrate(tableManager: Table) {
  const expenses = await expenseService.getAll();
  for (const item of expenses) {
    tableManager.addRow(item);
  }
}

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

  table.addRow(record);
}

function compareRecords(a, b) {
  return new Date(a.date) > new Date(b.date);
}

function createRow({ name, amount, category, date, id }: Expense) {
  const row = tr(
    {},
    td({}, `${date.getDate()}.${date.getMonth() + 1}`),
    td({}, name),
    td({}, category),
    td({}, span({ className: "currency" }, amount.toString())),
    td(
      {},
      button({ className: "edit-btn" }, "Edit"),
      button({ className: "delete-btn" }, "Delete")
    )
  );

  row.id = id;

  return row;
}
