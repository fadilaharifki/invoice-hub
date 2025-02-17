import ListInvoiceComponent from "@/components/invoices/list-invoice";
import { Params } from "@/interface/base";
import { InvoiceInterface } from "@/interface/invoices";
import { getDocuments } from "@/service/firestore-service";

export default async function InvoicesPage() {
  const params: Params<InvoiceInterface> = {
    filters: [
      // { field: "status", operator: "==", value: "Unpaid" },
      // { field: "amount", operator: ">", value: 100000 },
    ],
    orderByField: "status",
    orderDirection: "asc",
    limit: 10,
  };

  const invoices = await getDocuments("invoices", params);
  return <ListInvoiceComponent invoices={invoices as InvoiceInterface[]} />;
}
