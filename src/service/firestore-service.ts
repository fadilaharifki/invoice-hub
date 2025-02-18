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
import { Operator } from "@/interface/base";

export interface QueryParams {
  filters?: { field: string; operator: Operator; value: string }[];
  orderByFields?: { field: string; direction: "asc" | "desc" }[];
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

    if (params.orderByFields?.length) {
      params.orderByFields.forEach(({ field, direction }) => {
        constraints.push(orderBy(field, direction));
      });
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
  const q = query(collection(db, collectionName), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  const docRef = doc(db, collectionName, querySnapshot.docs[0].id);

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
  const q = query(collection(db, collectionName), where("id", "==", id));
  const querySnapshot = await getDocs(q);

  const docRef = doc(db, collectionName, querySnapshot.docs[0].id);

  await updateDoc(docRef, updatedData);
  return { id, ...updatedData };
};

export const deleteDocument = async (collectionName: string, id: string) => {
  const q = query(collection(db, collectionName), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  const docRef = doc(db, collectionName, querySnapshot.docs[0].id);

  await deleteDoc(docRef);
  return id;
};
