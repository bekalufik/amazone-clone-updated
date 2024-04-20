import React, { createContext, useContext, useReducer } from "react";
export const DataContext = createContext();

export const useStateValue=()=>{
    return useContext(DataContext)
}
const DataProvider = ({ children ,reducer,initialState}) => {
  return (
  <DataContext.Provider value={useReducer(reducer,initialState)}>
    {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
