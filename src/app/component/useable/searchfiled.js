"use client";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { asyncSearchFilter } from "@/app/store/Actions/searchFilterAction";

const SearchFilter = forwardRef(
  ({ model, filterOptions, onDataFetched }, ref) => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    // ---------- Fetch API ----------
    const fetchData = async (
      updatedFilters = filters,
      updatedQuery = query
    ) => {
      try {
        const result = await dispatch(
          asyncSearchFilter({
            model,
            query: updatedQuery,
            page,
            limit,
            ...updatedFilters,
          })
        );
        if (result && result.data) {
          onDataFetched(result);
        }
      } catch (err) {
        console.error("Filter API failed:", err);
      }
    };

    // ---------- Reset ----------
    const resetFilters = () => {
      setQuery("");
      setFilters({});
      setPage(1);
      fetchData({}, ""); // refresh data
    };

    // ---------- Expose methods to parent ----------
    useImperativeHandle(ref, () => ({
      fetchData,
      resetFilters,
    }));

    // ---------- UI ----------
    return (
      <div className="flex items-center gap-2 text-[14px] ">
        {/* Search box */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchData(filters, e.target.value); // run on Enter
            }
          }}
          placeholder="Search..."
          className="border px-2 py-1 rounded outline-primary"
        />

        {/* Filter dropdowns */}
        {/* {filterOptions?.map((opt) => (
          <select
            key={opt.key}
            value={filters[opt.key] || ""}
            onChange={(e) => {
              const updated = { ...filters, [opt.key]: e.target.value };
              setFilters(updated);
              fetchData(updated, query); // run immediately on select
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="">{opt.label}</option>
            {opt.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ))} */}
      </div>
    );
  }
);

SearchFilter.displayName = "SearchFilter";
export default SearchFilter;
