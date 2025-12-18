import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type Estimation = {
  id: string
  title: string
  sections: any[]
  createdAt: string
}

const initialState: { isLoading: boolean; data: Estimation[]; error?: string } = {
  isLoading: false,
  data: [],
}

import mockService from '../../../services/mockService'

export const fetchEstimations = createAsyncThunk('estimations/fetch', async () => {
  return await mockService.getEstimations()
})

export const createEstimationThunk = createAsyncThunk('estimations/create', async (payload: any) => {
  return await mockService.createEstimation(payload)
})

export const updateEstimationThunk = createAsyncThunk('estimations/update', async ({ id, payload }: any) => {
  return await mockService.updateEstimation(id, payload)
})

export const deleteEstimationThunk = createAsyncThunk('estimations/delete', async (id: string) => {
  return await mockService.deleteEstimation(id)
})

const slice = createSlice({
  name: 'estimations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEstimations.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchEstimations.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(fetchEstimations.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(createEstimationThunk.fulfilled, (state, action) => {
      state.data.push(action.payload)
    })
    builder.addCase(updateEstimationThunk.fulfilled, (state, action) => {
      state.data = state.data.map((p) => (p.id === action.payload.id ? action.payload : p))
    })
  },
})

export default slice.reducer
