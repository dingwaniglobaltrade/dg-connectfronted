import axios from "@/app/utils/axios";
import {
  productreport,
  salesperreport,
  attendancereport,
  distributorreport,
  retailersreport,
  expensereport,
  orderitemsreport,
  iserror,
  removeerror,
} from "../Reducers/reportsReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

//salesperson create report
export const createSalesReport = (start, end) => async (dispatch) => {
  try {
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      responseType: "blob", // <-- IMPORTANT for file download
    };

    const query = new URLSearchParams({ start, end }).toString();
    console.log({ start, end });

    const { data } = await axios.get(`/reports/sales/excel?${query}`, config);

    // Create a download for the Excel file
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "sales_report.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();

    dispatch(salesperreport(data));

    return { success: true };
  } catch (error) {
    dispatch(
      iserror(
        error?.response?.data?.message || "Failed to download Sales Report"
      )
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};

//attendance reports
export const createAttendanceReport = (start, end) => async (dispatch) => {
  try {
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      responseType: "blob", // <-- IMPORTANT for file download
    };

    const query = new URLSearchParams({ start, end }).toString();
    console.log({ start, end });

    const { data } = await axios.get(
      `/reports/attendance/excel?${query}`,
      config
    );

    // Create a download for the Excel file
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance_report.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();

    dispatch(attendancereport(data));

    return { success: true };
  } catch (error) {
    dispatch(
      iserror(
        error?.response?.data?.message || "Failed to download Sales Report"
      )
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};

//product reports
export const createProductReport = (start, end) => async (dispatch) => {
  try {
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      responseType: "blob", // <-- IMPORTANT for file download
    };

    const query = new URLSearchParams({ start, end }).toString();
    console.log({ start, end });

    const { data } = await axios.get(`/reports/product/excel?${query}`, config);

    // Create a download for the Excel file
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "product_report.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();

    dispatch(productreport(data));

    return { success: true };
  } catch (error) {
    dispatch(
      iserror(
        error?.response?.data?.message || "Failed to download product Report"
      )
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};

//distributor report
export const createDistributorReport = (start, end) => async (dispatch) => {
  try {
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      responseType: "blob", // <-- IMPORTANT for file download
    };

    const query = new URLSearchParams({ start, end }).toString();
    console.log({ start, end });

    const { data } = await axios.get(
      `/reports/distributor/excel?${query}`,
      config
    );

    // Create a download for the Excel file
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "distributor_report.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();

    dispatch(distributorreport(data));

    return { success: true };
  } catch (error) {
    dispatch(
      iserror(
        error?.response?.data?.message ||
          "Failed to download distributor Report"
      )
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};

//retailer report
export const createRetailerReport = (start, end) => async (dispatch) => {
  try {
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      responseType: "blob", // <-- IMPORTANT for file download
    };

    const query = new URLSearchParams({ start, end }).toString();
    console.log({ start, end });

    const { data } = await axios.get(
      `/reports/retailer/excel?${query}`,
      config
    );

    // Create a download for the Excel file
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "retailer_report.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();

    dispatch(retailersreport(data));

    return { success: true };
  } catch (error) {
    dispatch(
      iserror(
        error?.response?.data?.message || "Failed to download retailer Report"
      )
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};

//order items report
export const createOrderItemsReport = (start, end) => async (dispatch) => {
  try {
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      responseType: "blob", // <-- IMPORTANT for file download
    };

    const query = new URLSearchParams({ start, end }).toString();
    console.log({ start, end });

    const { data } = await axios.get(
      `/reports/OrderItems/excel?${query}`,
      config
    );

    // Create a download for the Excel file
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "orderItems_report.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();

    dispatch(orderitemsreport(data));

    return { success: true };
  } catch (error) {
    dispatch(
      iserror(
        error?.response?.data?.message ||
          "Failed to download orderItems_report Report"
      )
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};

//expenses reports
export const createExpenseReport = (start, end) => async (dispatch) => {
  try {
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      responseType: "blob", // <-- IMPORTANT for file download
    };

    const query = new URLSearchParams({ start, end }).toString();
    console.log({ start, end });

    const { data } = await axios.get(`/reports/expense/excel?${query}`, config);

    // Create a download for the Excel file
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "expense_report.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();

    dispatch(expensereport(data));

    return { success: true };
  } catch (error) {
    dispatch(
      iserror(
        error?.response?.data?.message || "Failed to download expense Report"
      )
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};
