import axios from "@/app/utils/axios";
import { getToken } from "@/app/utils/token"; 
import {fetchdata,  iserror, removeerror} from "@/app/store/Reducers/searchFilterReducers";


// const getToken = () => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("token");
//   }
//   return null;
// };


export const asyncSearchFilter =
  ({ model, query = "", filters = {}, page = 1, limit = 7, sort, order = "asc" }) =>
  async (dispatch) => {
    try {
      const token = getToken();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          model,
          query,
          page,
          limit,
          sort,
          order,
          ...filters, // merge filter params dynamically
        },
      };

      // Ensure the URL is correct (add full API base if needed)
      const { data } = await axios.get("/centralize/search&filter", config);
  console.log({data});
  
      // Dispatch to store
      dispatch(fetchdata(data));

      return data; // return result for component use
    } catch (error) {
      console.error("Error in search&filter:", error?.response?.data || error.message);
      dispatch(iserror(error?.response?.data?.error || error.message));
      return { data: [], total: 0, page, pages: 0 }; // safe fallback
    }
  };

