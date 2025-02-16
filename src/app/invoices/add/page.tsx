"use client";
import { useState } from "react";
import type React from "react";

import { Box, Button, Card, Typography, Alert, Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "@/components/invoices/customFormField";

const invoiceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  number: z.string().min(1, "Number is required"),
  dueDate: z.string().min(1, "Due Date is required"),
  amount: z.string().min(1, "Amount is required"),
  status: z.enum(["pending", "paid", "overdue"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

export default function AddInvoicePage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: "",
      number: "",
      dueDate: "",
      amount: "",
      status: "",
    },
  });

  const [showSuccess] = useState(false);

  const onSubmit = (data: InvoiceFormData) => {
    console.log("Form Data:", data);
    alert("Invoice successfully added!");
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add Invoice
      </Typography>

      <Card sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Invoice Form
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 direction={"column"} container spacing={3}>
            <Grid2
              direction={"row"}
              container
              spacing={3}
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
                  name="number"
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
                  control={control}
                />
              </Grid2>
              <Grid2>
                <CustomFormField
                  name="status"
                  label="Status"
                  required
                  type="select"
                  control={control}
                  options={[
                    { label: "Pending", value: "pending" },
                    { label: "Paid", value: "paid" },
                    { label: "Overdue", value: "overdue" },
                  ]}
                />
              </Grid2>
            </Grid2>

            <Grid2 sx={{ textAlign: "right" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 2 }}
              >
                + Add Invoice
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
