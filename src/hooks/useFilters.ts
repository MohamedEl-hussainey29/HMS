import { useMemo } from "react";
import { DataFilter } from "../context/FiltersContext";

interface UseFilteredListOptions<T> {
  searchFields?: (item: T) => string[];
  facilityField?: (item: T) => string[];
  startDateField?: (item: T) => string;
  endDateField?: (item: T) => string;
}

export default function useFilters<T>(
  items: T[],
  options: UseFilteredListOptions<T> = {}
) {
  const { search, facility, startDate, endDate } = DataFilter();
  const { searchFields, facilityField, startDateField, endDateField } = options;

  return useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        search && searchFields
          ? searchFields(item).some((field) =>
              field?.toLowerCase().includes(search.toLowerCase())
            )
          : true;

      const matchesFacility =
        facility && facilityField
          ? facilityField(item).includes(facility)
          : true;

      const matchesDates = (() => {
        if (!startDate && !endDate) return true;
        
        const matchesStartDate = startDate && startDateField
            ? startDateField(item).split("T")[0] === startDate
            : false;

        const matchesEndDate = endDate && endDateField
            ? endDateField(item).split("T")[0] === endDate
            : false;

        return matchesStartDate || matchesEndDate;
        })();

      return matchesSearch && matchesFacility && matchesDates;
    });
  }, [items, search, facility, startDate, endDate, searchFields, facilityField, startDateField, endDateField]);
}