/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  where,
  orderBy,
  limit,
  query,
  Query,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase-config";

interface QueryParams {
  filters?: { field: string; operator: any; value: any }[];
  orderByField?: string;
  orderDirection?: "asc" | "desc";
  limit?: number;
}

export const getDocuments = async (
  collectionName: string,
  params?: QueryParams
) => {
  let q: Query<DocumentData> = collection(db, collectionName);

  if (params) {
    const constraints = [];

    if (params.filters) {
      params.filters.forEach((filter) => {
        constraints.push(where(filter.field, filter.operator, filter.value));
      });
    }

    if (params.orderByField) {
      constraints.push(
        orderBy(params.orderByField, params.orderDirection || "asc")
      );
    }

    if (params.limit) {
      constraints.push(limit(params.limit));
    }

    q = query(q, ...constraints);
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getDocumentById = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const addDocument = async (collectionName: string, data: any) => {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, data);
  return { id: docRef.id, ...data };
};

export const updateDocument = async (
  collectionName: string,
  id: string,
  updatedData: any
) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, updatedData);
  return { id, ...updatedData };
};

export const deleteDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
  return id;
};
