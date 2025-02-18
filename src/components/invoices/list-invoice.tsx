/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo } from "react";
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
import {
  BorderColorRounded,
  CheckBox,
  DeleteOutlineRounded,
} from "@mui/icons-material";
import { colors, getStatusColor, getTextColor } from "@/constants/colors";
import { useDeleteInvoice, useGetInvoice } from "@/hooks/useInvoices";
import { InvoiceInterface } from "@/interface/invoices";
import { Params } from "@/interface/base";
import LoadingDialog from "../loading";
import { useUrlParams } from "@/hooks/useParams";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";

const options = [
  {
    value: "",
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

const searchableFields: (keyof InvoiceInterface)[] = ["name"];

export default function ListInvoiceComponent({
  invoices,
}: {
  invoices: InvoiceInterface[];
}) {
  const router = useRouter();
  const { success } = useToast();

  const { getAllParams, setParams } = useUrlParams();
  const columnHelper = createColumnHelper<InvoiceInterface>();
  const urlParams = getAllParams();

  const filters = useMemo(() => {
    return (
      Object.entries(urlParams)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value)
        .flatMap(([key, value]) => {
          if (key === "search") {
            return searchableFields
              .map((field) => ({
                field,
                operator: ">=",
                value: value,
              }))
              .concat(
                searchableFields.map((field) => ({
                  field,
                  operator: "<",
                  value: value + "\uf8ff",
                }))
              );
          }

          return {
            field: key as keyof InvoiceInterface,
            operator: "==",
            value: key === "amount" ? parseFloat(value) : value,
          };
        })
    );
  }, [urlParams]);

  const params = useMemo(() => {
    return {
      filters,
      orderByFields: Object.entries(getAllParams()).flatMap(([key]) => {
        if (key === "search") {
          return searchableFields.map((field) => ({
            field,
            direction: "asc",
          }));
        }

        return [
          {
            field: key,
            direction: key === "status" ? "desc" : "asc",
          },
        ];
      }),
      orderDirection: "asc",
      limit: 10,
      initialData: invoices,
    };
  }, [filters, getAllParams, invoices]);

  const {
    data,
    isLoading,
    refetch: refetchDataInvoice,
  } = useGetInvoice(params as Params<InvoiceInterface>);

  const { control, watch } = useForm<any>({
    defaultValues: {
      search: "",
      status: "",
    },
  });

  useEffect(() => {
    const subscription = watch((values) => {
      const filteredValues: Record<string, string | null> = Object.fromEntries(
        Object.entries(values)
          .filter(
            ([, value]) => value !== "" && value !== undefined && value !== null
          )
          .map(([key, value]) => [key, String(value)])
      );

      setParams(filteredValues);
    });

    return () => subscription.unsubscribe();
  }, [setParams, watch]);

  const { mutate: mutateDeleteInvoice, isPending: isLoadingDeleteInvoice } =
    useDeleteInvoice({
      onSuccess: () => {
        refetchDataInvoice();
        success({
          title: "Invoice delete successfully!",
          icon: <CheckBox sx={{ color: colors.greenLime }} />,
        });
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
        cell: (info) => (
          <>
            <IconButton
              size="small"
              onClick={() => {
                router.push(`/invoices/manage/${info.row.original.id}`);
              }}
            >
              <BorderColorRounded />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                mutateDeleteInvoice(info.row.original.id);
              }}
            >
              <DeleteOutlineRounded />
            </IconButton>
          </>
        ),
      }),
    ],
    [columnHelper, mutateDeleteInvoice, router]
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <LoadingDialog open={isLoading || isLoadingDeleteInvoice} />
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
            placeholder="Search by name invoice"
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
