import Http from "../services/http";
const useMock = !import.meta.env.VITE_API_URL

export const loginAPI = (data: any) => {
  if (useMock) {
    return Promise.resolve({ data: { token: 'mock-token', data: { data: { _id: 'mock-user', username: data.username } } } })
  }
  return Http.post("auth/login", data);
};

export const signupAPI = (data: any) => {
  if (useMock) {
    return Promise.resolve({ data: { token: 'mock-token', data: { data: { _id: 'mock-user', username: data.username } } } })
  }
  return Http.post("auth/register", data);
};

export const unfriendUserAPI = () => {
  return Http.get("auth/list-friend");
};

export const invitationAPI = (data: any) => {
  return Http.post("auth/add-friend", data);
};


export const addFriendAPI = (data: any) => {
  return Http.post("auth/accept-invite", data);
};

export const sidebarAPI = () => {
  return Http.get("chat/users");
};

export const getProjectsAPI = (params?: any) => {
  return Http.get("projects", params);
};

export const getProjectAPI = (id: number | string) => {
  // if (useMock) {
  //   const project = sampleData.find((p: any) => String(p.id) === String(id));
  //   return Promise.resolve({ data: project });
  // }
  return Http.get(`projects/${id}`);
};

export const createProjectAPI = (data: any) => {
  // if (useMock) {
  //   const newProject = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
  //   sampleData.unshift(newProject);
  //   return Promise.resolve({ data: newProject });
  // }
  return Http.post("projects", data);
};

export const updateProjectAPI = (id: number | string, data: any) => {
  // if (useMock) {
  //   const idx = sampleData.findIndex((p: any) => String(p.id) === String(id));
  //   if (idx >= 0) {
  //     sampleData[idx] = { ...sampleData[idx], ...data };
  //     return Promise.resolve({ data: sampleData[idx] });
  //   }
  //   return Promise.reject(new Error("Not found"));
  // }
  return Http.put(`projects/${id}`, data);
};

export const deleteProjectAPI = (id: number | string) => {
  // if (useMock) {
  //   const idx = sampleData.findIndex((p: any) => String(p.id) === String(id));
  //   if (idx >= 0) {
  //     const deleted = sampleData.splice(idx, 1)[0];
  //     return Promise.resolve({ data: deleted });
  //   }
  //   return Promise.reject(new Error("Not found"));
  // }
  return Http.delete(`projects/${id}`);
};
