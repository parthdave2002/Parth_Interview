import { createSlice } from "@reduxjs/toolkit";
import { createEstimateAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data: any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const estimateAddSlice = createSlice({
  name: "estimateAdd",
  initialState: data,
  reducers: {
    createestimateStart(state) {
      state.isLoading = true;
    },
    createestimateSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "estimate created successfully";
    },
    createestimateFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    createestimateReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const createestimateHandler = (data: any) => async (dispatch: any) => {
  try {
    dispatch(estimateAddAction.createestimateStart());
    const response: any = await createEstimateAPI(data);
    dispatch(estimateAddAction.createestimateSuccess(response));
    toast.success(response?.data?.msg || "estimate created successfully");
    return response;
  } catch (e: any) {
    dispatch(estimateAddAction.createestimateFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg || "Failed to create estimate");
    throw e;
  }
};

export default estimateAddSlice.reducer;
export const estimateAddAction = estimateAddSlice.actions;
