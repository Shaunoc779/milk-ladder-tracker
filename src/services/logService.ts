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
import { DailyLog, MilkEntry, SymptomType } from '../models/types';

const getLogId = (childId: string, date: string) => `${childId}_${date}`;

export const createDailyLog = async (log: Omit<DailyLog, 'id' | 'createdAt' | 'updatedAt'>) => {
  const logId = getLogId(log.childId, log.date);
  const newLog: DailyLog = {
    ...log,
    id: logId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await setDoc(doc(db, 'dailyLogs', logId), {
    ...newLog,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return newLog;
};

export const getDailyLog = async (childId: string, date: string): Promise<DailyLog | null> => {
  const logId = getLogId(childId, date);
  const logDoc = await getDoc(doc(db, 'dailyLogs', logId));
  if (logDoc.exists()) {
    return { id: logDoc.id, ...logDoc.data() } as DailyLog;
  }
  return null;
};

export const getDailyLogs = async (
  childId: string,
  startDate: string,
  endDate: string
): Promise<DailyLog[]> => {
  const q = query(
    collection(db, 'dailyLogs'),
    where('childId', '==', childId),
    where('date', '>=', startDate),
    where('date', '<=', endDate)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as DailyLog));
};

export const getFlaggedLogs = async (childId: string): Promise<DailyLog[]> => {
  const q = query(
    collection(db, 'dailyLogs'),
    where('childId', '==', childId),
    where('flagged', '==', true)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as DailyLog));
};

export const addMilkEntry = async (childId: string, date: string, entry: MilkEntry) => {
  const logId = getLogId(childId, date);
  await updateDoc(doc(db, 'dailyLogs', logId), {
    milkEntries: arrayUnion(entry),
    updatedAt: serverTimestamp(),
  });
};

export const updateSymptoms = async (
  childId: string,
  date: string,
  symptoms: SymptomType[],
  flagged: boolean
) => {
  const logId = getLogId(childId, date);
  await updateDoc(doc(db, 'dailyLogs', logId), {
    symptoms,
    flagged,
    updatedAt: serverTimestamp(),
  });
};

export const updateNotes = async (childId: string, date: string, notes: string) => {
  const logId = getLogId(childId, date);
  await updateDoc(doc(db, 'dailyLogs', logId), {
    notes,
    updatedAt: serverTimestamp(),
  });
};
