"use client";

import { Provider } from "react-redux";
import { store } from "./store/store"; // adjust this path if needed

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}