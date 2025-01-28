import { useState } from 'react';
import { MvContext } from '../context/MvContext';
import TypeMvContext from '../types/TypeMvContext';

export const MvProvider = ({ children }: { children: React.ReactNode }) => {
  const [mvContext, setMvContext] = useState<TypeMvContext>({isStart: false, panFlg: false, panObjectName: '', isLoaded: false});
  const value = { mvContext, setMvContext };

  return <MvContext.Provider value={value}>{children}</MvContext.Provider>;
};