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
        if (!startDateField || !endDateField) return true;

        const itemStartDate = startDateField(item).split("T")[0];
        const itemEndDate = endDateField(item).split("T")[0];

        return itemStartDate <= endDate && itemEndDate >= startDate;
      })();

      return matchesSearch && matchesFacility && matchesDates;
    });
  }, [items, search, facility, startDate, endDate, searchFields, facilityField, startDateField, endDateField]);
}