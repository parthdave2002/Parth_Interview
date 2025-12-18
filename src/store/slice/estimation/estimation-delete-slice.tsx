import { createSlice } from "@reduxjs/toolkit";
import { deleteEstimateAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data: any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const estimateDeleteSlice = createSlice({
  name: "estimateDelete",
  initialState: data,
  reducers: {
    deleteestimateStart(state) {
      state.isLoading = true;
    },
    deleteestimateSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "estimate deleted successfully";
    },
    deleteestimateFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    deleteestimateReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const deleteestimateHandler = (id: number | string) => async (dispatch: any) => {
  try {
    dispatch(estimateDeleteAction.deleteestimateStart());
    const response: any = await deleteEstimateAPI(id);
    dispatch(estimateDeleteAction.deleteestimateSuccess(response));
    toast.success(response?.data?.msg || "estimate deleted successfully");
    return response;
  } catch (e: any) {
    dispatch(estimateDeleteAction.deleteestimateFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg || "Failed to delete estimate");
    throw e;
  }
};

export default estimateDeleteSlice.reducer;
export const estimateDeleteAction = estimateDeleteSlice.actions;
