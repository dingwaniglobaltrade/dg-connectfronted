import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncSearchFilter } from "@/app/store/Actions/searchFilterAction";

const useSearchFilter = (model, params) => {
  const dispatch = useDispatch();
  const { data, loading, error, total, page, pages } = useSelector(
    (state) => state.searchFilter
  );

  useEffect(() => {
    dispatch(asyncSearchFilter({ model, ...params }));
  }, [model, params, dispatch]);

  return { data, loading, error, total, page, pages };
};

export default useSearchFilter;
