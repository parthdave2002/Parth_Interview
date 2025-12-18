import { createSlice } from "@reduxjs/toolkit";
import { updateProjectAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data: any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const projectUpdateSlice = createSlice({
  name: "projectUpdate",
  initialState: data,
  reducers: {
    updateProjectStart(state) {
      state.isLoading = true;
    },
    updateProjectSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "Project updated successfully";
    },
    updateProjectFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    updateProjectReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const updateProjectHandler = (id: number | string, data: any) => async (dispatch: any) => {
  try {
    dispatch(projectUpdateAction.updateProjectStart());
    const response: any = await updateProjectAPI(id, data);
    dispatch(projectUpdateAction.updateProjectSuccess(response));
    toast.success(response?.data?.msg || "Project updated successfully");
    return response;
  } catch (e: any) {
    dispatch(projectUpdateAction.updateProjectFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg || "Failed to update project");
    throw e;
  }
};

export default projectUpdateSlice.reducer;
export const projectUpdateAction = projectUpdateSlice.actions;
