import { createSlice } from "@reduxjs/toolkit";
import { createProjectAPI } from "../../../api/api";
import { toast } from "react-toastify";

const data: any = {
  isLoading: false,
  error: "",
  message: null,
  data: null,
};

const projectAddSlice = createSlice({
  name: "projectAdd",
  initialState: data,
  reducers: {
    createProjectStart(state) {
      state.isLoading = true;
    },
    createProjectSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "Project created successfully";
    },
    createProjectFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
    },
    createProjectReset(state) {
      state.isLoading = false;
      state.message = null;
      state.data = null;
      state.error = "";
    },
  },
});

export const createProjectHandler = (data: any) => async (dispatch: any) => {
  try {
    dispatch(projectAddAction.createProjectStart());
    const response: any = await createProjectAPI(data);
    dispatch(projectAddAction.createProjectSuccess(response));
    toast.success(response?.data?.msg || "Project created successfully");
    return response;
  } catch (e: any) {
    dispatch(projectAddAction.createProjectFailure(e?.response?.data));
    toast.error(e?.response?.data?.msg || "Failed to create project");
    throw e;
  }
};

export default projectAddSlice.reducer;
export const projectAddAction = projectAddSlice.actions;
