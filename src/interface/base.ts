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

export type Operator =
  | "=="
  | "!="
  | "<"
  | "<="
  | ">"
  | ">="
  | "array-contains"
  | "array-contains-any"
  | "in"
  | "not-in";
