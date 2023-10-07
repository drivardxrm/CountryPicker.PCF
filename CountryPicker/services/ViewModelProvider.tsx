import * as React from "react"
import { useContext } from "react"

import IViewModel from "./ViewModel"


interface ViewModelProviderProps {
    viewmodel:IViewModel,
    children: React.ReactNode
}

export const ViewModelProvider = ({ viewmodel, children }: ViewModelProviderProps) => {
  

  //add viewmodel methods here
  return (
    <ViewModelContext.Provider value={viewmodel}>
      {children}
    </ViewModelContext.Provider>
  );
};

const ViewModelContext = React.createContext<IViewModel>(undefined!);

export const useViewModel = () => {
  
  return useContext(ViewModelContext);
}

