import { createSlice } from "@reduxjs/toolkit";
import { getEstimateAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data:any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const estimateSlice = createSlice({
  name: "estimate",
  initialState: data,
  reducers: {
    estimateSlice(state) {
      state.isLoading = false;
    },
    estimateSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    estimateSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    estimateSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const estimateListHandler = (data: any) => async (dispatch: any) => {
  try {
    dispatch(estimateListAction.estimateSlice());
    const response: any = await getEstimateAPI(data); 
    dispatch(estimateListAction.estimateSliceSuccess(response));
    return response;
  } catch (e: any) {
    dispatch(estimateListAction.estimateSliceFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg);
    throw e;
  }
};
export default estimateSlice.reducer;
export const estimateListAction = estimateSlice.actions;