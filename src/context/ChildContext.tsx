import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Child } from '../models/types';

interface ChildContextType {
  selectedChild: Child | null;
  setSelectedChild: (child: Child | null) => void;
  children: Child[];
  setChildren: (children: Child[]) => void;
}

const ChildContext = createContext<ChildContextType>({
  selectedChild: null,
  setSelectedChild: () => {},
  children: [],
  setChildren: () => {},
});

export const ChildProvider = ({ children: reactChildren }: { children: ReactNode }) => {
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [children, setChildren] = useState<Child[]>([]);

  return (
    <ChildContext.Provider value={{ selectedChild, setSelectedChild, children, setChildren }}>
      {reactChildren}
    </ChildContext.Provider>
  );
};

export const useChild = () => useContext(ChildContext);
