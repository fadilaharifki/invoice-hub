import AddInvoiceComponent, {
  InvoiceFormDataExtended,
} from "@/components/invoices/add-invoice";
import { getDocumentById } from "@/service/firestore-service";
export default async function ManageInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = await getDocumentById("invoices", id);

  return (
    <AddInvoiceComponent data={data as unknown as InvoiceFormDataExtended} />
  );
}
