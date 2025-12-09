import axios from "@/app/utils/axios";
import {
  fetchRoute,
  createnewRoute,
  editRoute,
  deleteRoute,
  iserror,
  assignroute,
  removeerror,
} from "../Reducers/routeReducers";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const asyncfetchroutewiseSalesperson =
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
      const routes = await axios.get("/Route/routes-with-salespersons", config);
      dispatch(fetchRoute(routes.data));
      return routes.data;
    } catch (error) {
      console.error("Error in asyncaddadmin:", error.message);
      dispatch(iserror(error.message));
    }
  };

export const asyncfetchroute = () => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };
    const { data } = await axios.get("/Route/fetchAll", config);

    dispatch(fetchRoute(data.routes));
    return data;
  } catch (error) {
    console.error("Error in asyncaddadmin:", error.message);
    dispatch(iserror(error.message));
  }
};

export const createRoute = (routeData) => async (dispatch, getState) => {

  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post("/Route/create-route", routeData, config);

    dispatch(createnewRoute(data));
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

//edit routes
export const editExistingRoutes =
  (id, routeData) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };
      const data = await axios.put(
        `/Route/update-routes/${id}`,
        routeData,
        config
      );

      dispatch(editRoute(data));
      return { success: true, payload: data };
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

//delete route
export const deleteRouteAction = (id) => async (dispatch, getState) => {

  try {
    const token = getToken(); // get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const data = await axios.delete(`/Route/delete-routes/${id}`, config);

    dispatch(deleteRoute(data));
    return { success: true, payload: data };
  } catch (error) {
    dispatch(
      iserror(error?.response?.data?.message || "Failed to delete route")
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};

//assign route to the salepserson & distributor
export const AssignRoutetoSalesperson =
  (id, routeID) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send assignedRoute as payload in request
      const payload = { routeID };

      const response = await axios.patch(
        `/Route/assign-route/${id}`,
        payload,
        config
      );
  dispatch(
        assignroute(
         response.data.result
        )
      );

      return { success: true, payload: response.data.result };
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

//fetch distributor wise routes
export const asyncfetchDistributorWiseRoutes =
  () => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };
      const routes = await axios.get(
        "/Route/distributor-assigned-routes",
        config
      );
      dispatch(fetchRoute(routes.data));
      return routes.data;
    } catch (error) {
      console.error("Error in asyncaddadmin:", error.message);
      dispatch(iserror(error.message));
    }
  };
