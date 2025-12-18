import { createSlice } from "@reduxjs/toolkit";
import { deleteProjectAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data: any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const projectDeleteSlice = createSlice({
  name: "projectDelete",
  initialState: data,
  reducers: {
    deleteProjectStart(state) {
      state.isLoading = true;
    },
    deleteProjectSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "Project deleted successfully";
    },
    deleteProjectFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    deleteProjectReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const deleteProjectHandler = (id: number | string) => async (dispatch: any) => {
  try {
    dispatch(projectDeleteAction.deleteProjectStart());
    const response: any = await deleteProjectAPI(id);
    dispatch(projectDeleteAction.deleteProjectSuccess(response));
    toast.success(response?.data?.msg || "Project deleted successfully");
    return response;
  } catch (e: any) {
    dispatch(projectDeleteAction.deleteProjectFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg || "Failed to delete project");
    throw e;
  }
};

export default projectDeleteSlice.reducer;
export const projectDeleteAction = projectDeleteSlice.actions;
