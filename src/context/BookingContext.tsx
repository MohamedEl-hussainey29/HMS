import { createContext, useContext, useState, type ReactNode } from "react";

interface BookingContextType {
  startDate: string;
  endDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  
}

export const BookingContext = createContext<BookingContextType | null>(null);

export default function BookingProvider({ children }: { children: ReactNode }) {
  const [startDate, setStartDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  });


  return (
    <BookingContext.Provider
      value={{
        startDate,
        endDate,
        setStartDate,
        setEndDate, 
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
};
