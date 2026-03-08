export interface User {
  uid: string;
  email: string;
  displayName: string;
  childrenIds: string[];
}

export interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  currentLadderStep: number;
  parentIds: string[];
  ladderStartDate: string;
  createdAt: string;
}

export interface MilkEntry {
  id: string;
  type: string;
  description: string;
  quantity: string;
  time: string;
  ladderStep: number;
}

export interface DailyLog {
  id: string;
  childId: string;
  date: string;
  milkEntries: MilkEntry[];
  flagged: boolean;
  symptoms: SymptomType[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type SymptomType =
  | 'skin_outbreak'
  | 'eczema'
  | 'diarrhoea'
  | 'vomiting'
  | 'reflux'
  | 'bloating'
  | 'hives'
  | 'congestion'
  | 'irritability'
  | 'other';
