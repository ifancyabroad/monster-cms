import { createSlice } from '@reduxjs/toolkit';

interface ModalsState {
	loginModalOpen: boolean;
	monsterModalOpen: boolean;
}

const initialState: ModalsState = {
	loginModalOpen: false,
	monsterModalOpen: false, 
}

export const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		openLoginModal: (state) => {
			state.loginModalOpen = true
		},
		closeLoginModal: (state) => {
			state.loginModalOpen = false
		},
		openMonsterModal: (state) => {
			state.monsterModalOpen = true
		},
		closeMonsterModal: (state) => {
			state.monsterModalOpen = false
		},
	},
})

// Action creators are generated for each case reducer function
export const { openLoginModal, closeLoginModal, openMonsterModal, closeMonsterModal } = modalsSlice.actions

export default modalsSlice.reducer