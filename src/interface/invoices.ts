export type Status = "unpaid" | "paid" | "unpaid" | "";

export interface InvoiceInterface {
  id: string;
  invoiceNumber: string;
  name: string;
  dueDate: Date | null;
  status: Status;
  amount: number;
}

export interface AddInvoiceInterface {
  invoiceNumber: string;
  name: string;
  dueDate: Date | null;
  status: Status;
  amount: number;
}
