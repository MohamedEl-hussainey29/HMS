/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

interface FilterContextInterface {
  search: string;
  setSearch: (value: string) => void;
  facility: string | null;
  setFacility: (value: string | null) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  isActive: boolean | null;
  setIsActive: (value: boolean | null) => void;
}

export const FilterContext = createContext<FilterContextInterface | null>(null);

export default function FilterContextProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [facility, setFacility] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isActive, setIsActive] = useState<boolean | null>(null);

  return (
    <FilterContext.Provider
      value={{ search, setSearch, facility, setFacility, startDate, setStartDate, endDate, setEndDate, isActive, setIsActive }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function DataFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("DataFilter must be used within a FilterProvider");
  }
  return context;
}