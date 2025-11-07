import axios from "@/app/utils/axios";
import {
  fetchAllOrders,
  createnewOrders,
  updateOrderStatus,
  fetchOrdersbyid,
  iserror,
} from "../Reducers/orderReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

//fetch all the orders
export const asyncfetchOrders =
  ({ page, limit }) =>
  async (dispatch, getState) => {
    try {
      // console.log("Dispatching with page:", page, "limit:", limit);
      const token = getToken(); // get token from localStorage

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
        params: { page, limit },
      };
      // console.log(token);

      const { data } = await axios.get("/order/Allorders", config);
      // console.log("Fetched orderss:", data);
      dispatch(fetchAllOrders(data));
      return data;
    } catch (error) {
      console.error("Error in fetching orders", error.message);
      dispatch(iserror(error.message));
    }
  };

//fetch order by the customerID
export const asyncfetchCustomerOrder =
  ({ page, limit }) =>
  async (dispatch, getState) => {
    try {
      // console.log("Dispatching with page:", page, "limit:", limit);
      const token = getToken(); // get token from localStorage

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
        params: { page, limit },
      };
      // console.log(token);

      const { data } = await axios.get(`/order/customer-wise-order`, config);
      // console.log("Fetched orderss:", data);
      dispatch(fetchAllOrders(data));
      return data;
    } catch (error) {
      console.error("Error in fetching orders", error.message);
      dispatch(iserror(error.message));
    }
  };

//create order api
export const createOrder = (orderData) => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const { data } = await axios.post("/order/create-order", orderData, config);
    dispatch(createnewOrders(data));
    // console.log({ data });

    return { success: true, data };
  } catch (error) {
    dispatch(
      iserror(error?.response?.data?.message || "Failed to create Order")
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};

//create order api
export const createCustomerOrder =
  ({ id, orderData }) =>
  async (dispatch, getState) => {
    // console.log(orderData);

    try {
      const token = getToken(); // get token from localStorage

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };
      // console.log({ orderData });

      const { data } = await axios.post(
        `/order/order-create/${id}`,
        orderData,
        config
      );
      dispatch(createnewOrders(data));
      // console.log({ data });

      return { success: true, data };
    } catch (error) {
      dispatch(
        iserror(error?.response?.data?.message || "Failed to create Order")
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };

export const UpdateOrderStatus =
  (id, orderStatus) => async (dispatch, getState) => {
    // console.log({ id });
    // console.log(orderStatus);
    try {
      const token = getToken(); // get token from localStorage

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };
      const { data } = await axios.patch(
        `/order/updateOrder/${id}/status`,
        orderStatus,
        config
      );
      dispatch(updateOrderStatus(data));
      // console.log({ data });

      return { success: true, data };
    } catch (error) {
      dispatch(
        iserror(error?.response?.data?.message || "Failed to create Order")
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };

// Optional: separate action if you want to handle Razorpay separately
export const createRazorpayOrder =
  (orderID, orderAmount) => async (dispatch, getState) => {
    // console.log({ orderAmount });
    // console.log({ orderID });

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.post(
        "/payment/create-order",
        { orderID, orderAmount },
        config
      );
      console.log({ data });

      return { success: true, payload: data };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };

// New: verify payment action (same structure)
export const verifyPayment = (paymentData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.post(
      "/payment/verify-payment",
      paymentData,
      config
    );

    return { success: true, payload: data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || "Payment verification failed",
    };
  }
};

export const FetchOrderDetailesByID = (id) =>async(dispatch) =>{
   try {
      const token = getToken(); // get token from localStorage
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };
      console.log(token);
  
      const { data } = await axios.get(`/order/orders/${id}`, config);
      console.log({data});
  
      dispatch(fetchOrdersbyid(data));
      return data;
    } catch (error) {
      console.error("Error in fetcing Order detailes:", error.message);
      dispatch(iserror(error.message));
    }
}