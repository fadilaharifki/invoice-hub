/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
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
import { useGetInvoice } from "@/hooks/useInvoices";
import { InvoiceInterface } from "@/interface/invoices";
import { Params } from "@/interface/base";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/service/firebase-config";
import { v4 as uuidv4 } from "uuid";

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

// const demoInvoices: Invoice[] = [
//   {
//     invoiceNumber: "INV202501",
//     name: "Internet Subscription",
//     dueDate: "Jan 13,2025",
//     status: "Paid",
//     amount: 582901,
//   },
//   {
//     invoiceNumber: "INV202502",
//     name: "Electricity Bill",
//     dueDate: "Feb 04,2025",
//     status: "Paid",
//     amount: 311909,
//   },
//   {
//     invoiceNumber: "INV202503",
//     name: "Gym Membership",
//     dueDate: "Feb 23,2025",
//     status: "Unpaid",
//     amount: 425000,
//   },
//   {
//     invoiceNumber: "INV202504",
//     name: "Phone Bill",
//     dueDate: "Feb 23,2025",
//     status: "Pending",
//     amount: 148891,
//   },
// ];

// const addInvoicesToFirestore = async () => {
//   const invoicesCollection = collection(db, "invoices");

//   for (const invoice of demoInvoices) {
//     const invoiceWithId = {
//       ...invoice,
//       id: uuidv4(),
//     };

//     try {
//       await addDoc(invoicesCollection, invoiceWithId);
//       console.log(`Invoice ${invoice.invoiceNumber} added successfully.`);
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   }
// };

export default function ListInvoiceComponent({
  invoices,
}: {
  invoices: InvoiceInterface[];
}) {
  const columnHelper = createColumnHelper<InvoiceInterface>();
  const [searchQuery, setSearchQuery] = useState("");

  const params: Params<InvoiceInterface> = {
    filters: [
      {
        field: "status",
        operator: "==",
        value: searchQuery ? searchQuery : "Unpaid",
      },
      {
        field: "amount",
        operator: ">",
        value: searchQuery ? parseInt(searchQuery, 10) : 100000,
      },
    ],
    orderByField: "status",
    orderDirection: "asc",
    limit: 10,
    initialData: invoices,
  };

  const { data, isLoading, error } = useGetInvoice(params);

  console.log(data, "data");

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

  const columns = useMemo<ColumnDef<InvoiceInterface, any>[]>(
    () => [
      columnHelper.accessor("name", {
        header: "Invoice",
        cell: (info) => (
          <div>
            <div>{info.getValue()}</div>
            <div style={{ color: "#666", fontSize: "0.875rem" }}>
              {info.row.original.invoiceNumber}
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
      {/* <button
        onClick={() => {
          addInvoicesToFirestore();
        }}
      >
        tets
      </button> */}
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

      <InvoiceTable data={data ?? []} columns={columns as InvoiceInterface[]} />
    </Container>
  );
}
