import axios from "@/app/utils/axios";
import {
  fetchProducts,
  createnewProduct,
  updateproductstock,
  editproduct,
  deleteproduct,
  iserror,
  removeerror,
} from "../Reducers/productReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const asyncfetchproduct = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/product/getallproducts");
    // console.log("Fetched products:", data.products);
    dispatch(fetchProducts(data.products));
    return data;
  } catch (error) {
    console.error("Error in fetcing product:", error.message);
    dispatch(iserror(error.message));
  }
};

//fetch the product by the id
export const fetchProductbyID = (id) => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };
    console.log(token);

    const { data } = await axios.get(`/product/getproductByID/${id}`, config);
    console.log({data});

    dispatch(fetchProducts(data));
    return data;
  } catch (error) {
    console.error("Error in fetcing product detailes:", error.message);
    dispatch(iserror(error.message));
  }
};

export const createProduct = (formData) => async (dispatch, getState) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
        "Content-Type": "multipart/form-data",
      },
    };
    console.log({ formData });

    const { data } = await axios.post("/product/create", formData, config);

    dispatch(createnewProduct(data));

    return { success: true, payload: data };
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to create product";
    dispatch(iserror(message));
    return {
      success: false,
      message,
    };
  }
};

// update the product stock
export const updateStockProduct =
  (productId, stockFields) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };
      console.log(productId);
      console.log(stockFields);

      const result = await axios.put(
        `/product/updateInvetory/${productId}`,
        stockFields,
        config
      );

      dispatch(updateproductstock(result.data));
      return { success: true, payload: result.data };
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

//edit products detailes
export const editProductdetailes =
  (id, formData) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
          "Content-Type": "multipart/form-data",
        },
      };

      const result = await axios.put(
        `/product/updateproductDetiles/${id}`,
        formData,
        config
      );

      dispatch(editproduct(result.data));
      return { success: true, payload: result.data };
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

//delete product detailes
export const deleteProduct = (id) => async (dispatch, getState) => {
  console.log(id);
  try {
    const token = getToken(); // get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };
    const response = await axios.delete(`/product/deleteProduct/${id}`, config);
    dispatch(deleteproduct(response.data));
    return { success: true, payload: response.data };
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
