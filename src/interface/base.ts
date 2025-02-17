import { WhereFilterOp } from "firebase/firestore";

interface Filter {
  field: string;
  operator: WhereFilterOp;
  value: string | number;
}

export interface Params<T> {
  filters?: Filter[];
  orderByField?: string;
  orderDirection?: "asc" | "desc";
  limit?: number;
  initialData?: T[];
}
