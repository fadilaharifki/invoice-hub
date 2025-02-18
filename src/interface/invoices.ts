export interface InvoiceInterface {
  id: string;
  invoiceNumber: string;
  name: string;
  dueDate: Date | null;
  status: "unpaid" | "paid" | "unpaid";
  amount: number;
}

export interface AddInvoiceInterface {
  invoiceNumber: string;
  name: string;
  dueDate: Date | null;
  status: "unpaid" | "paid" | "unpaid";
  amount: number;
}
