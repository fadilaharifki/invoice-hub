import { InvoiceFormDataExtended } from "@/components/invoices/add-invoice";
import { Params } from "@/interface/base";
import { AddInvoiceInterface, InvoiceInterface } from "@/interface/invoices";
import {
  addDocument,
  deleteDocument,
  getDocuments,
  updateDocument,
} from "@/service/firestore-service";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

export const useGetInvoice = (params: Params<InvoiceInterface>) => {
  return useQuery({
    queryKey: ["invoices", params],
    queryFn: () => getDocuments("invoices", params),
    initialData: params.initialData,
  });
};

export const useAddInvoice = (
  options?: Omit<
    UseMutationOptions<InvoiceInterface, Error, AddInvoiceInterface>,
    "mutationFn"
  >
) => {
  return useMutation<InvoiceInterface, Error, AddInvoiceInterface>({
    mutationFn: async (newInvoice: AddInvoiceInterface) => {
      const payload = {
        id: uuidv4(),
        ...newInvoice,
        invoiceNumber: `INV${newInvoice.invoiceNumber}`,
        amount: +newInvoice?.amount,
      };

      const result = await addDocument("invoices", payload);
      return result;
    },
    ...options,
  });
};

export const useUpdateInvoice = (
  options?: Omit<
    UseMutationOptions<InvoiceInterface, Error, InvoiceFormDataExtended>,
    "mutationFn"
  >
) => {
  return useMutation<InvoiceInterface, Error, InvoiceFormDataExtended>({
    mutationFn: async (updateInvoice: InvoiceFormDataExtended) => {
      const payload = {
        ...updateInvoice,
        invoiceNumber: `INV${updateInvoice.invoiceNumber}`,
        amount: +updateInvoice.amount,
      };

      const { id, ...updateData } = payload;

      const result = await updateDocument("invoices", id, updateData);
      return result;
    },
    ...options,
  });
};

export const useDeleteInvoice = (
  options?: Omit<UseMutationOptions<string, Error, string>, "mutationFn">
) => {
  return useMutation<string, Error, string>({
    mutationFn: async (id: string) => {
      await deleteDocument("invoices", id);
      return id;
    },
    ...options,
  });
};
