export class Table {
  private records: any[] = [];

  constructor(
    private element: HTMLTableElement,
    private createRow: (record: any) => HTMLTableRowElement,
    private compareRecords: (a, b: any) => boolean,
    records?: any[]
  ) {
    if (records) {
      this.records = records;
    }
  }

  addRow(record: any) {
    const row = this.createRow(record);

    // const nextRecord = this.records.find(this.compareRecords.bind(this));

    const nextRecord = this.findNextExpenseRecord(record);

    if (nextRecord) {
      const nextNode = document.getElementById(nextRecord.id);
      nextNode.parentElement.insertBefore(row, nextNode);
    } else {
      this.element.appendChild(row);
    }

    this.records.push(record);
  }

  private findNextExpenseRecord(record: any) {
    return this.records.find((x) => x.date > record.date);
  }
}
