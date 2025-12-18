import { createSlice } from "@reduxjs/toolkit";
import { getProjectAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data:any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState: data,
  reducers: {
    projectSlice(state) {
      state.isLoading = false;
    },
    projectSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    projectSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    projectSliceReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const projectDetailHandler = (data: any) => async (dispatch: any) => {
  try {
    dispatch(projectDetailAction.projectSlice());
    const response: any = await getProjectAPI(data); 
    dispatch(projectDetailAction.projectSliceSuccess(response));
    return response;
  } catch (e: any) {
    dispatch(projectDetailAction.projectSliceFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg);
    throw e;
  }
};
export default projectSlice.reducer;
export const projectDetailAction = projectSlice.actions;