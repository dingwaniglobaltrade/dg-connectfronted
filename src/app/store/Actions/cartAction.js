import axios from "@/app/utils/axios";
import {
  fetchCartProducts,
  createCart,
  editCart,
  removeCartItems,
  iserror,
} from "../Reducers/cartReducers";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const fetchCartData = (id) => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };
    const { data } = await axios.get(`/Cart/fetch/${id}`, config);
    dispatch(fetchCartProducts(data));
    return data;
  } catch (error) {
    console.error("Error in asyncaddadmin:", error.message);
    dispatch(iserror(error.message));
  }
};

//create Retailer
export const AddCartItems = (CartData) => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const { data } = await axios.post("/Cart/add-product", CartData, config);
    dispatch(createCart(data));
    return { success: true, payload: data };
  } catch (error) {
    dispatch(
      iserror(error?.response?.data?.message || "Failed to create cart")
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};

//edit products detailes
export const updateCartQuantity =
  (userId, ProductID, action) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };

      const result = await axios.put(
        `/Cart/update/${userId}`,
        { ProductID, action },
        config
      );

      dispatch(editCart(result.data.data));
      return { success: true, payload: result.data.data };
    } catch (error) {
      dispatch(
        iserror(error?.response?.data?.message || "Failed to update cart")
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };

//delete product detailes
export const removeProductFromCart =
  (userId, ProductID) => async (dispatch) => {
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { ProductID },
      };

      const { data } = await axios.delete(`/Cart/remove/${userId}`, config);

      dispatch(removeCartItems(data));
      return { success: true, payload: data };
    } catch (error) {
      dispatch(
        iserror(
          error?.response?.data?.message || "Failed to remove product from cart"
        )
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };

export const removeCart = () => async (dispatch) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete("/Cart/clear", config);
    dispatch(removeCartItems(data));
    return { success: true, payload: data };
  } catch (error) {
    dispatch(
      iserror(
        error?.response?.data?.message || "Failed to remove product from cart"
      )
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};
