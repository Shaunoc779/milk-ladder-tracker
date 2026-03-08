import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Child } from '../models/types';

export const createChild = async (child: Omit<Child, 'id' | 'createdAt'>) => {
  const childRef = doc(collection(db, 'children'));
  const newChild: Child = {
    ...child,
    id: childRef.id,
    createdAt: new Date().toISOString(),
  };
  await setDoc(childRef, { ...newChild, createdAt: serverTimestamp() });
  return newChild;
};

export const getChild = async (childId: string): Promise<Child | null> => {
  const childDoc = await getDoc(doc(db, 'children', childId));
  if (childDoc.exists()) {
    return { id: childDoc.id, ...childDoc.data() } as Child;
  }
  return null;
};

export const updateChild = async (childId: string, updates: Partial<Child>) => {
  await updateDoc(doc(db, 'children', childId), updates);
};

export const getChildrenForUser = async (userId: string): Promise<Child[]> => {
  const q = query(collection(db, 'children'), where('parentIds', 'array-contains', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Child));
};

export const updateLadderStep = async (childId: string, step: number) => {
  await updateDoc(doc(db, 'children', childId), {
    currentLadderStep: step,
    ladderStartDate: new Date().toISOString(),
  });
};

export const addParentToChild = async (childId: string, parentId: string) => {
  await updateDoc(doc(db, 'children', childId), {
    parentIds: arrayUnion(parentId),
  });
};
