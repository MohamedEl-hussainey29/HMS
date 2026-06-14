import { useMemo } from "react";
import { DataFilter } from "../context/FiltersContext";

interface UseFilteredListOptions<T> {
  searchFields?: (item: T) => string[];
  facilityField?: (item: T) => string[];
  startDateField?: (item: T) => string;
  endDateField?: (item: T) => string;
  isActiveField?: (item: T) => boolean;
}

export default function useFilters<T>(
  items: T[],
  options: UseFilteredListOptions<T> = {}
) {
  const { search, facility, startDate, endDate, isActive } = DataFilter();
  const { searchFields, facilityField, startDateField, endDateField, isActiveField } = options;

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

      const matchesIsActive =
        isActive !== null && isActiveField
          ? isActiveField(item) === isActive
          : true;

      const matchesDates = (() => {
        if (!startDate && !endDate) return true;
        if (!startDateField || !endDateField) return true;

        const itemStartDate = startDateField(item).split("T")[0];
        const itemEndDate = endDateField(item).split("T")[0];

        //only one is selelcted
        if (startDate && !endDate) return itemStartDate >= startDate;
        if (!startDate && endDate) return itemEndDate <= endDate;

        // both selected => overlap check
        return itemStartDate <= endDate && itemEndDate >= startDate;
      })();

      return matchesSearch && matchesFacility && matchesIsActive && matchesDates;
    });
  }, [items, search, facility, startDate, endDate, isActive, searchFields, facilityField, startDateField, endDateField, isActiveField]);
}