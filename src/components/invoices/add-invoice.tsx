"use client";

import { useRef, useState } from "react";
import type React from "react";

import {
  Box,
  Button,
  Card,
  Typography,
  Alert,
  Grid2,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "@/components/custom-form-field";
import { Add, CheckBox } from "@mui/icons-material";
import useToast from "@/hooks/useToast";
import { colors } from "@/constants/colors";
import { useAddInvoice, useUpdateInvoice } from "@/hooks/useInvoices";
import { AddInvoiceInterface } from "@/interface/invoices";
import LoadingDialog from "../loading";
import { useRouter } from "next/navigation";
import { formatAmount } from "@/utils/format";

const invoiceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  invoiceNumber: z.string().min(1, "Invoice Number is required"),
  dueDate: z.string().min(1, "Due Date is required"),
  amount: z.string().min(1, "Amount is required"),
  status: z.enum(["pending", "paid", "unpaid"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

export type InvoiceFormDataExtended = InvoiceFormData & {
  id: string;
};

export default function AddInvoiceComponent({
  data,
}: {
  data: InvoiceFormDataExtended;
}) {
  const router = useRouter();
  const { mutate: mutateAddInvoice, isPending: isLoadingAddInvoice } =
    useAddInvoice({
      onSuccess: () => {
        customToast(formRef, {
          title: "Invoice added successfully!",
          description:
            "You can view and manage your invoice in the 'My Invoices' section.",
          icon: <CheckBox sx={{ color: colors.greenLime }} />,
        });
      },
    });

  const { mutate: mutateEditInvoice, isPending: isLoadingEditInvoice } =
    useUpdateInvoice({
      onSuccess: () => {
        customToast(formRef, {
          title: "Invoice update successfully!",
          description:
            "You can view and manage your invoice in the 'My Invoices' section.",
          icon: <CheckBox sx={{ color: colors.greenLime }} />,
        });
        router.back();
      },
    });

  const formRef = useRef<HTMLFormElement>(null);
  const { customToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: data?.name ?? "",
      invoiceNumber: data?.invoiceNumber.replaceAll("INV", "") ?? "",
      dueDate: data?.dueDate ?? "",
      amount: formatAmount(data?.amount.toString()) ?? "",
      status: data?.status ?? undefined,
    },
  });

  const [showSuccess] = useState(false);

  const onSubmit = (values: InvoiceFormData) => {
    if (data.id) {
      mutateEditInvoice({ id: data.id, ...values });
    } else mutateAddInvoice(values as unknown as AddInvoiceInterface);
  };

  return (
    <Box sx={{ px: 15, py: 3 }}>
      <LoadingDialog open={isLoadingAddInvoice || isLoadingEditInvoice} />
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "700", paddingBottom: 3 }}
      >
        {data?.id ? "Edit" : "Add"} Invoice
      </Typography>

      <Card>
        <Typography sx={{ px: 2, py: 1 }} variant="h6">
          Invoice Form
        </Typography>
        <Divider />
        <form ref={formRef} className="p-5" onSubmit={handleSubmit(onSubmit)}>
          <Grid2 direction={"column"} container spacing={1}>
            <Grid2
              direction={"row"}
              container
              rowSpacing={1}
              columnSpacing={3}
              sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              <Grid2>
                <CustomFormField
                  name="name"
                  label="Name"
                  required
                  type="text"
                  placeholder="Enter your invoice name"
                  control={control}
                />
              </Grid2>
              <Grid2>
                <CustomFormField
                  name="invoiceNumber"
                  label="Number"
                  required
                  type="text"
                  placeholder="Enter your invoice number"
                  control={control}
                />
              </Grid2>
              <Grid2>
                <CustomFormField
                  name="dueDate"
                  label="Due Date"
                  required
                  type="date"
                  control={control}
                />
              </Grid2>
              <Grid2>
                <CustomFormField
                  name="amount"
                  label="Amount"
                  required
                  type="currency"
                  placeholder="Enter your invoice amount"
                  prefix="Rp "
                  control={control}
                  showClearButton={false}
                />
              </Grid2>
              <Grid2>
                <CustomFormField
                  name="status"
                  label="Status"
                  required
                  type="select"
                  control={control}
                  placeholder="Choose the status"
                  options={[
                    { label: "Pending", value: "pending" },
                    { label: "Paid", value: "paid" },
                    { label: "Unpaid", value: "unpaid" },
                  ]}
                />
              </Grid2>
            </Grid2>

            <Grid2 sx={{ textAlign: "right" }}>
              <Button
                disabled={!isDirty}
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 2, gap: 1 }}
              >
                <Add fontSize="small" /> Add Invoice
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Card>

      {showSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Invoice added successfully! You can view and manage your invoice in
          the &apos;My Invoices&apos; section.
        </Alert>
      )}
    </Box>
  );
}
