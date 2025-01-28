import { createContext } from 'react';
import TypeMvContext from '../types/TypeMvContext';

export const MvContext = createContext<{
  mvContext: TypeMvContext;
  setMvContext: (mvContext: TypeMvContext) => void;
}>({
  mvContext: {} as TypeMvContext,
  setMvContext: () => {},
});