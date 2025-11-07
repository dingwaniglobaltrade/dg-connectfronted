import axios from "@/app/utils/axios";
import {
  fetchSalesperons,
  fetchSalepseronsbyID,
  editSalesperson,
  iserror,
} from "../Reducers/salespersonReducers";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

//fetch all the salesperons
export const fetchAllSalespersons = () => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };
    const { data } = await axios.get("/salesperson/all-salesperson", {
      config,
      responseType: "json",
    });

    dispatch(fetchSalesperons(data.salesperson));
    return data;
  } catch (error) {
    console.error("Error in asyncaddadmin:", error.message);
    dispatch(iserror(error.message));
  }
};

//fetch salesperosn wise detailes
export const fetchSalespersonsDetailesbyID =
  (id) => async (dispatch, getState) => {
    console.log({ id });

    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };
      const { data } = await axios.get(
        `/salesperson/salesperson-details/${id}`,
        config
      );
      console.log("Fetched Staff:", data.salesperson);
      dispatch(fetchSalepseronsbyID(data.salesperson));
      return data;
    } catch (error) {
      console.error("Error in asyncaddadmin:", error.message);
      dispatch(iserror(error.message));
    }
  };

//fetch all the salesperons
export const fetchAllSalespersonsbyDistributor =
  (id) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };
      const { data } = await axios.get(
        "/salesperson/assigned-salespersons",
        config
      );
      console.log("Fetched Staff:", data.salesperson);
      dispatch(fetchSalesperons(data.salesperson));
      return data;
    } catch (error) {
      console.error("Error in asyncaddadmin:", error.message);
      dispatch(iserror(error.message));
    }
  };

//update the salesperson detailes by id
export const updateSalespersonDetailes = async (id, updatedFields) => {
  try {
    const token = getToken(); // get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const data = await axios.put(
      `/salesperson/salesperson-updateDetiles/${id}`,
      updatedFields,
      config
    );

    dispatch(editSalesperson(data));
    return { success: true, payload: data };
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
