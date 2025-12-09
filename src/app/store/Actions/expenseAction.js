import axios from "@/app/utils/axios";
import {
  fetchExpenses,
  iserror,
  fetchExpensesbyID,
  createnewExpenses,
  editExistingExpenses,
  deleteExpenses,
} from "../Reducers/expenseReducers";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const asyncfetchExpenses =
  ({ page, limit }) =>
  async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
        params: { page, limit },
      };
      const { data } = await axios.get("/expense/fetch-all-expenses", config);
      dispatch(fetchExpenses(data.data));
      return data;
    } catch (error) {
      console.error(
        "Error in asyncfetchExpenses:",
        error.response?.data || error.message
      );
      dispatch(iserror(error.message));
    }
  };

//fetch the expense by the ide
export const fetchExpenseByID = (id) => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };
    const { data } = await axios.get(`/expense/expense-detiles/${id}`, config);
    dispatch(fetchExpenses(data.data));
    return data;
  } catch (error) {
    console.error(
      "Error in asyncfetchExpenses:",
      error.response?.data || error.message
    );
    dispatch(iserror(error.message));
  }
};

//create expense
export const CreateExpense = (addExpenseData) => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };
    const { data } = await axios.post(
      "/expense/create-expense",
      addExpenseData,
      config
    );
    dispatch(createnewExpenses(data));
    return { success: true, payload: data };
  } catch (error) {
    dispatch(
      iserror(error?.response?.data?.message || "Failed to create Expense")
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};

//update the expense
export const updatetheExpenseStatus =
  (id, expenseUpdatedData) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };

      const data = await axios.put(
        `/expense/update-expense/${id}/admin`,
        expenseUpdatedData,
        config
      );

      dispatch(editExistingExpenses(data.data));
      return { success: true, payload: data };
    } catch (error) {
      dispatch(
        iserror(error?.response?.data?.message || "Failed to create product")
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };
