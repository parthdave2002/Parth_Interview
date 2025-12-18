import { v4 as uuidv4 } from 'uuid'

const PROJECTS_KEY = 'mock_projects'
const ESTIMATIONS_KEY = 'mock_estimations'

const read = (key: string) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

const write = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const getProjects = async () => {
  return read(PROJECTS_KEY)
}

export const createProject = async (payload: any) => {
  const projects = read(PROJECTS_KEY)
  const item = { id: uuidv4(), ...payload, createdAt: new Date().toISOString() }
  projects.push(item)
  write(PROJECTS_KEY, projects)
  return item
}

export const updateProject = async (id: string, payload: any) => {
  const projects = read(PROJECTS_KEY)
  const idx = projects.findIndex((p: any) => p.id === id)
  if (idx >= 0) {
    projects[idx] = { ...projects[idx], ...payload }
    write(PROJECTS_KEY, projects)
    return projects[idx]
  }
  throw new Error('Not found')
}

export const deleteProject = async (id: string) => {
  let projects = read(PROJECTS_KEY)
  projects = projects.filter((p: any) => p.id !== id)
  write(PROJECTS_KEY, projects)
  return true
}

export const getEstimations = async () => {
  return read(ESTIMATIONS_KEY)
}

export const createEstimation = async (payload: any) => {
  const list = read(ESTIMATIONS_KEY)
  const item = { id: uuidv4(), ...payload, createdAt: new Date().toISOString() }
  list.push(item)
  write(ESTIMATIONS_KEY, list)
  return item
}

export const updateEstimation = async (id: string, payload: any) => {
  const list = read(ESTIMATIONS_KEY)
  const idx = list.findIndex((p: any) => p.id === id)
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...payload }
    write(ESTIMATIONS_KEY, list)
    return list[idx]
  }
  throw new Error('Not found')
}

export const deleteEstimation = async (id: string) => {
  let list = read(ESTIMATIONS_KEY)
  list = list.filter((p: any) => p.id !== id)
  write(ESTIMATIONS_KEY, list)
  return true
}

export default {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getEstimations,
  createEstimation,
  updateEstimation,
  deleteEstimation,
}
