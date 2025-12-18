import Http from "../services/http";

export const loginAPI = async (data: any) => {
  try {
    const users: any = await Http.get("users");
    const user = users.find((u: any) => u.email === data.email && u.password === data.password);

    if (!user) {
      const error = { response: { data: { msg: "Invalid email or password" } } };
      return Promise.reject(error);
    }
    
    const returnedUser = { ...user, _id: user.id };
    return Promise.resolve({ data: { token: "12233", data: returnedUser } });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const signupAPI = (data: any) => {
  return Http.post("users", data);
};

export const getProjectsAPI = (params?: any) => {
  return Http.get("projects", params);
};

export const getDashboardAPI = (params?: any) => {
  return Http.get("dashboard", params);
};

export const getProjectAPI = (id: number | string) => {
  return Http.get(`projects/${id}`);
};

export const createProjectAPI = (data: any) => {
  return Http.post("projects", data);
};

export const updateProjectAPI = (id: number | string, data: any) => {
  return Http.put(`projects/${id}`, data);
};

export const deleteProjectAPI = (id: number | string) => {
  return Http.delete(`projects/${id}`);
};



// Estimate Module

export const getEstimateAPI = (params?: any) => {
  return Http.get("estimate", params);
};


export const getEstimateDetailAPI = (id: number | string) => {
  return Http.get(`estimate/${id}`);
};

export const createEstimateAPI = (data: any) => {
  return Http.post("estimate", data);
};

export const updateEstimateAPI = (id: number | string, data: any) => {
  return Http.put(`estimate/${id}`, data);
};

export const deleteEstimateAPI = (id: number | string) => {
  return Http.delete(`estimate/${id}`);
};
