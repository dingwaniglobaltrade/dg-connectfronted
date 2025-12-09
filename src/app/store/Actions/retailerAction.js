import axios from "@/app/utils/axios";
import {
  fetchRetailer,
  iserror,
  createnewRetailer,
  editRetailer,
  deleteRetailer,
} from "../Reducers/retailerReducers";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const asyncfetchretailer =
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

      const { data } = await axios.get("/retailer/all-retailers", config);
      // console.log("Fetched products:", data.products);
      dispatch(fetchRetailer(data.retailers));
      return data;
    } catch (error) {
      console.error("Error in asyncaddadmin:", error.message);
      dispatch(iserror(error.message));
    }
  };

//create Retailer
export const createRetailer =
  (retailerFormData) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };

      const { data } = await axios.post(
        "/retailer/create",
        retailerFormData,
        config
      );

      dispatch(createnewRetailer(data));
      return { success: true, payload: data };
    } catch (error) {
      dispatch(
        iserror(error?.response?.data?.message || "Failed to create retailer")
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
};

//fetch the retailer by the id
export const fetchRetailerbyID = (id) => async (dispatch, getState) => {

  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const { data } = await axios.get(
      `/retailer/reatiler-details/${id}`,
      config
    );

    dispatch(fetchRetailer(data.retailers));
    return data;
  } catch (error) {
    console.error("Error in asyncaddadmin:", error.message);
    dispatch(iserror(error.message));
  }
};

//edit products detailes
export const editRetailerdetailes =
  (id, updatedFields) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };

      const data = await axios.put(
        `/retailer/update-detailes/${id}`,
        updatedFields,
        config
      );

      dispatch(editRetailer(data.data));
      return { success: true, payload: data.data };
    } catch (error) {
      dispatch(
        iserror(error?.response?.data?.message || "Failed to update retailer")
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };

//delete product detailes
export const deleteRetailerAction = (id) => async (dispatch, getState) => {

  try {
    const token = getToken(); // get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const data = await axios.delete(`/retailer/delete/${id}`, config);

    dispatch(deleteRetailer(data));
    return { success: true, payload: data };
  } catch (error) {
    dispatch(
      iserror(error?.response?.data?.message || "Failed to delete retailer")
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};
