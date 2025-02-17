export interface InvoiceInterface {
  id: string;
  invoiceNumber: string;
  name: string;
  dueDate: Date;
  status: "Unpaid" | "Paid" | "Overdue";
  amount: number;
}
