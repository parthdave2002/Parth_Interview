import { createSlice } from "@reduxjs/toolkit";
import { getDashboardAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data:any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: data,
  reducers: {
    dashboardSlice(state) {
      state.isLoading = false;
    },
    dashboardSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    dashboardSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    dashboardSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const dashboardListHandler = () => async (dispatch: any) => {
  try {
    dispatch(dashboardListAction.dashboardSlice());
    const response: any = await getDashboardAPI(); 
    dispatch(dashboardListAction.dashboardSliceSuccess(response));
    return response;
  } catch (e: any) {
    dispatch(dashboardListAction.dashboardSliceFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg);
    throw e;
  }
};
export default dashboardSlice.reducer;
export const dashboardListAction = dashboardSlice.actions;