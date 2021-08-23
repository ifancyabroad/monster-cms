import { createSlice } from '@reduxjs/toolkit'

export const loginModalSlice = createSlice({
	name: 'loginModal',
	initialState: {
		open: false,
	},
	reducers: {
		openLoginModal: (state) => {
			state.open = true
		},
		closeLoginModal: (state) => {
			state.open = false
		},
	},
})

// Action creators are generated for each case reducer function
export const { openLoginModal, closeLoginModal } = loginModalSlice.actions

export default loginModalSlice.reducer