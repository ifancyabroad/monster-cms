import { createSlice } from '@reduxjs/toolkit'

export const sidedrawerSlice = createSlice({
  name: 'sidedrawer',
  initialState: {
    open: false,
  },
  reducers: {
    openSidedrawer: (state) => {
      state.open = true
    },
    closeSidedrawer: (state) => {
      state.open = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { openSidedrawer, closeSidedrawer } = sidedrawerSlice.actions

export default sidedrawerSlice.reducer