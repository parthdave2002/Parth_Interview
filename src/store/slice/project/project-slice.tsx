import { createSlice } from "@reduxjs/toolkit";
import { getProjectsAPI } from "../../../api/api";
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

export const projectListHandler = (data: any) => async (dispatch: any) => {
  try {
    dispatch(projectListAction.projectSlice());
    const response: any = await getProjectsAPI(data); 
    dispatch(projectListAction.projectSliceSuccess(response));
    return response;
  } catch (e: any) {
    dispatch(projectListAction.projectSliceFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg);
    throw e;
  }
};
export default projectSlice.reducer;
export const projectListAction = projectSlice.actions;