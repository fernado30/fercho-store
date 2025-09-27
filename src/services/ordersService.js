import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const ordersCol = collection(db, 'orders');

export const createOrder = async (order) => {
  const res = await addDoc(ordersCol, order);
  return res.id;
};
