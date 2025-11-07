import axios from "@/app/utils/axios";
import {
  fetchDistributors,
  createnewDistributor,
  editDistributor,
  assignSalesperson,
  removeDistributor,
  iserror,
} from "../Reducers/distributorReducers";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const fetchAllDistributor =
  ({ page, limit = 8 }) =>
  async (dispatch, getState) => {
    try {
      const token = getToken();
      console.log({ page });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, limit }, // now destructured from object
      };

      const { data } = await axios.get("/distributor/all-distributors", config);
      console.log({data: data.distributors});
      
      dispatch(fetchDistributors(data.distributors));
      return data;
    } catch (error) {
      console.error("Error fetching distributors:", error.message);
      dispatch(iserror(error.message));
    }
  };

//create Retailer
export const createDistributor =
  (formData) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };
      console.log({ data: formData });

      const { data } = await axios.post(
        "/distributor/create",
        formData,
        config
      );
      console.log("Distributor Created Successfully", data);
      dispatch(createnewDistributor(data));
      return { success: true, payload: data };
    } catch (error) {
      dispatch(
        iserror(
          error?.response?.data?.message || "Failed to create distributor"
        )
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };

//fetch the retailer by the id
export const fetchDistributorbyID = (id) => async (dispatch, getState) => {
  console.log({ id });
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };
    const { data } = await axios.get(
      `/distributor/distributor-details/${id}`,
      config
    );
    console.log(data);

    dispatch(fetchDistributors(data));
    return { payload: data };
  } catch (error) {
    console.error("Error in asyncaddadmin:", error.message);
    dispatch(iserror(error.message));
  }
};

//edit products detailes
export const editDistributordetailes =
  (id, updatedFields) => async (dispatch, getState) => {
    console.log(updatedFields);

    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };

      const data = await axios.put(
        `/distributor/update-detailes/${id}`,
        updatedFields,
        config
      );
      console.log({ data });

      dispatch(editDistributor(data.distributor));
      return { success: true, payload: data.distributor };
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
export const deleteDistributor = (id) => async (dispatch, getState) => {
  console.log(id);

  try {
    const token = getToken(); // get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const data = await axios.delete(`/distributor/delete/${id}`, config);

    dispatch(removeDistributor(data));
    return { success: true, payload: data };
  } catch (error) {
    dispatch(
      iserror(error?.response?.data?.message || "Failed to delete distributor")
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};

//assign the salesperson
export const AssignSalespersonToDistributor =
  (id, assignedSalespersons) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send routeID as payload in request
      const payload = { assignedSalespersons };

      const response = await axios.patch(
        `/distributor/assign-salesperson/${id}`,
        payload,
        config
      );

      dispatch(assignSalesperson(assignedSalespersons));

      return { success: true, payload: response.data };
    } catch (error) {
      dispatch(
        iserror(error?.response?.data?.message || "Failed to update route")
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };
