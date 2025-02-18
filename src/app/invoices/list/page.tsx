import ListInvoiceComponent from "@/components/invoices/list-invoice";
import { InvoiceInterface, Status } from "@/interface/invoices";
import { getDocuments, QueryParams } from "@/service/firestore-service";

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: { status: Status; search: string };
}) {
  const { status, search } = (await searchParams) || {};

  const filters = [];
  const orderByFields = [];

  if (status) {
    filters.push({ field: "status", operator: "==", value: status });
    orderByFields.push({ field: "status", direction: "asc" });
  }

  if (search) {
    filters.push({ field: "name", operator: ">=", value: search });
    filters.push({ field: "name", operator: "<", value: search + "\uf8ff" });
    orderByFields.push({ field: "name", direction: "asc" });
  }

  const filter = {
    filters,
    orderByFields,
    orderDirection: "asc",
    limit: 10,
  };

  const invoices = await getDocuments("invoices", filter as QueryParams);
  return (
    <ListInvoiceComponent
      invoices={invoices as InvoiceInterface[]}
      defaultParams={{
        status,
        search,
      }}
    />
  );
}
