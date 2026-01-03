import axios from "@/app/utils/axios";

/* =======================
   Helper: Get Token
======================= */
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

/* =======================
   Helper: Download Excel
======================= */
const downloadExcel = async (url, fileName, start, end) => {
  const token = getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  };

  const query = new URLSearchParams({ start, end }).toString();

  const { data } = await axios.get(`${url}?${query}`, config);

  const blobUrl = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
};

/* =======================
   Sales Report
======================= */
export const createSalesReport = (start, end) => async () => {
  try {
    await downloadExcel(
      "/reports/sales/excel",
      "sales_report.xlsx",
      start,
      end
    );
    return { success: true };
  } catch (error) {
    console.error("Sales report error:", error);
    return { success: false };
  }
};

/* =======================
   Attendance Report
======================= */
export const createAttendanceReport = (start, end) => async () => {
  try {
    await downloadExcel(
      "/reports/attendance/excel",
      "attendance_report.xlsx",
      start,
      end
    );
    return { success: true };
  } catch (error) {
    console.error("Attendance report error:", error);
    return { success: false };
  }
};

/* =======================
   Product Report
======================= */
export const createProductReport = (start, end) => async () => {
  try {
    await downloadExcel(
      "/reports/product/excel",
      "product_report.xlsx",
      start,
      end
    );
    return { success: true };
  } catch (error) {
    console.error("Product report error:", error);
    return { success: false };
  }
};

/* =======================
   Distributor Report
======================= */
export const createDistributorReport = (start, end) => async () => {
  try {
    await downloadExcel(
      "/reports/distributor/excel",
      "distributor_report.xlsx",
      start,
      end
    );
    return { success: true };
  } catch (error) {
    console.error("Distributor report error:", error);
    return { success: false };
  }
};

/* =======================
   Retailer Report
======================= */
export const createRetailerReport = (start, end) => async () => {
  try {
    await downloadExcel(
      "/reports/retailer/excel",
      "retailer_report.xlsx",
      start,
      end
    );
    return { success: true };
  } catch (error) {
    console.error("Retailer report error:", error);
    return { success: false };
  }
};

/* =======================
   Order Items Report
======================= */
export const createOrderItemsReport = (start, end) => async () => {
  try {
    await downloadExcel(
      "/reports/OrderItems/excel",
      "orderItems_report.xlsx",
      start,
      end
    );
    return { success: true };
  } catch (error) {
    console.error("Order items report error:", error);
    return { success: false };
  }
};

/* =======================
   Expense Report
======================= */
export const createExpenseReport = (start, end) => async () => {
  try {
    await downloadExcel(
      "/reports/expense/excel",
      "expense_report.xlsx",
      start,
      end
    );
    return { success: true };
  } catch (error) {
    console.error("Expense report error:", error);
    return { success: false };
  }
};
