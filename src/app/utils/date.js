// utils/date.js
import { format } from "date-fns";

/**
 * Formats a date string into a human-readable format.
 *
 * @param {string|Date} dateString - ISO date string or Date object
 * @param {boolean} withTime - Whether to include time
 * @returns {string} - Formatted date
 */
export const formatDate = (dateString, withTime = false) => {
  if (!dateString) return "-"; // handle null/undefined

  const date = new Date(dateString);

  return withTime
    ? format(date, "dd/MM/yyyy HH:mm") // ex: 19/09/2025 15:57
    : format(date, "dd/MM/yyyy");      // ex: 19/09/2025
};
