import { Params } from "@/interface/base";
import { InvoiceInterface } from "@/interface/invoices";
import { getDocuments } from "@/service/firestore-service";
import { useQuery } from "@tanstack/react-query";

export const useGetInvoice = (params: Params<InvoiceInterface>) => {
  return useQuery({
    queryKey: ["invoices", params],
    queryFn: () => getDocuments("invoices", params),
    initialData: params.initialData,
  });
};
