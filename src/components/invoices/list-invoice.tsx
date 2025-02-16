/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import {
  Container,
  Typography,
  InputAdornment,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import InvoiceTable from "@/components/table";
import CustomFormField from "@/components/custom-form-field";
import { useForm } from "react-hook-form";
import { ViewHeadlineRounded } from "@mui/icons-material";
import { getStatusColor, getTextColor } from "@/constants/colors";

interface Invoice {
  id: string;
  name: string;
  dueDate: string;
  status: "Paid" | "Unpaid" | "Pending";
  amount: number;
}

const options = [
  {
    value: "all",
    label: "All Status",
  },
  {
    value: "paid",
    label: "Paid",
  },
  {
    value: "unpaid",
    label: "Unpaid",
  },
  {
    value: "pending",
    label: "Pending",
  },
];

const demoInvoices: Invoice[] = [
  {
    id: "INV202501",
    name: "Internet Subscription",
    dueDate: "Jan 13,2025",
    status: "Paid",
    amount: 582901,
  },
  {
    id: "INV202502",
    name: "Electricity Bill",
    dueDate: "Feb 04,2025",
    status: "Paid",
    amount: 311909,
  },
  {
    id: "INV202503",
    name: "Gym Membership",
    dueDate: "Feb 23,2025",
    status: "Unpaid",
    amount: 425000,
  },
  {
    id: "INV202504",
    name: "Phone Bill",
    dueDate: "Feb 23,2025",
    status: "Pending",
    amount: 148891,
  },
];

export default function ListInvoiceComponent() {
  const columnHelper = createColumnHelper<Invoice>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      search: "",
      status: "",
    },
  });

  const columns = useMemo<ColumnDef<Invoice, any>[]>(
    () => [
      columnHelper.accessor("name", {
        header: "Invoice",
        cell: (info) => (
          <div>
            <div>{info.getValue()}</div>
            <div style={{ color: "#666", fontSize: "0.875rem" }}>
              {info.row.original.id}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("dueDate", {
        header: "Due Date",
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <Chip
            variant="outlined"
            label={info.getValue()}
            color={getStatusColor(info.getValue())}
            size="small"
            sx={{
              borderRadius: 100,
              textTransform: "capitalize",
              background: getTextColor(info.getValue()),
              border: 0,
              px: 1,
            }}
          />
        ),
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => `Rp ${info.getValue().toLocaleString("id-ID")}`,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: () => (
          <IconButton size="small">
            <ViewHeadlineRounded />
          </IconButton>
        ),
      }),
    ],
    [columnHelper]
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ flex: 1, fontWeight: "bold" }}
        >
          My Invoices
        </Typography>

        <Box sx={{ display: "flex", flex: 1, gap: 2 }}>
          <CustomFormField
            className="bg-white border-0 rounded-xl"
            control={control}
            name="search"
            placeholder="Search"
            label="Search"
            showClearButton={false}
            labelOutside={false}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <CustomFormField
            control={control}
            className="bg-white border-0 rounded-xl"
            type="select"
            name="status"
            placeholder="Status"
            showClearButton={false}
            labelOutside={false}
            label="Status"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            options={options}
          />
        </Box>
      </Box>

      <InvoiceTable data={demoInvoices} columns={columns} />
    </Container>
  );
}
