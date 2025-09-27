import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';

const productsCol = collection(db, 'products');

export const getAllProducts = async () => {
  const snapshot = await getDocs(productsCol);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getProduct = async (id) => {
  const docRef = doc(db, 'products', id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error('Producto no encontrado');
  return { id: snap.id, ...snap.data() };
};

export const createProduct = async (product) => {
  const res = await addDoc(productsCol, product);
  return res.id;
};

export const updateProduct = async (id, data) => {
  const ref = doc(db, 'products', id);
  await updateDoc(ref, data);
};

export const deleteProduct = async (id) => {
  const ref = doc(db, 'products', id);
  await deleteDoc(ref);
};

export const getProductsByCategory = async (category) => {
  const q = query(productsCol, where('category', '==', category));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};
