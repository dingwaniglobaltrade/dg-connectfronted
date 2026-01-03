import axios from "@/app/utils/axios";

// Get token safely (works in browser)
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Generic Excel download helper
const downloadReport = async (url, fileName, start, end) => {
  const token = getToken();

  const query = new URLSearchParams({ start, end }).toString();
  const response = await axios.get(`${url}?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: "blob",
  });

  // Handle JSON error responses
  if (response.data.type === "application/json") {
    const text = await response.data.text();
    const json = JSON.parse(text);
    throw new Error(json.message || "Report generation failed");
  }

  // Download Excel
  const blobUrl = window.URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

// ======= Report Actions =======
export const createSalesReport = (start, end) => async () => {
  try {
    await downloadReport("/reports/sales/excel", "sales_report.xlsx", start, end);
    return { success: true };
  } catch (error) {
    console.error("Sales report error:", error);
    return { success: false, message: error.message };
  }
};

export const createAttendanceReport = (start, end) => async () => {
  try {
    await downloadReport("/reports/attendance/excel", "attendance_report.xlsx", start, end);
    return { success: true };
  } catch (error) {
    console.error("Attendance report error:", error);
    return { success: false, message: error.message };
  }
};

export const createProductReport = (start, end) => async () => {
  try {
    await downloadReport("/reports/product/excel", "product_report.xlsx", start, end);
    return { success: true };
  } catch (error) {
    console.error("Product report error:", error);
    return { success: false, message: error.message };
  }
};

export const createDistributorReport = (start, end) => async () => {
  try {
    await downloadReport("/reports/distributor/excel", "distributor_report.xlsx", start, end);
    return { success: true };
  } catch (error) {
    console.error("Distributor report error:", error);
    return { success: false, message: error.message };
  }
};

export const createRetailerReport = (start, end) => async () => {
  try {
    await downloadReport("/reports/retailer/excel", "retailer_report.xlsx", start, end);
    return { success: true };
  } catch (error) {
    console.error("Retailer report error:", error);
    return { success: false, message: error.message };
  }
};

export const createOrderItemsReport = (start, end) => async () => {
  try {
    await downloadReport("/reports/OrderItems/excel", "orderItems_report.xlsx", start, end);
    return { success: true };
  } catch (error) {
    console.error("Order items report error:", error);
    return { success: false, message: error.message };
  }
};

export const createExpenseReport = (start, end) => async () => {
  try {
    await downloadReport("/reports/expense/excel", "expense_report.xlsx", start, end);
    return { success: true };
  } catch (error) {
    console.error("Expense report error:", error);
    return { success: false, message: error.message };
  }
};
