import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalsState {
	loginModalOpen: boolean;
	monsterModal: {
		open: boolean;
		monsterID?: string;
	}
}

const initialState: ModalsState = {
	loginModalOpen: false,
	monsterModal: {
		open: false
	}
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
		openMonsterModal: (state, action: PayloadAction<string | undefined>) => {
			state.monsterModal.open = true
			state.monsterModal.monsterID = action.payload
		},
		closeMonsterModal: (state) => {
			state.monsterModal.open = false
			state.monsterModal.monsterID = undefined
		},
	},
})

// Action creators are generated for each case reducer function
export const { openLoginModal, closeLoginModal, openMonsterModal, closeMonsterModal } = modalsSlice.actions

export default modalsSlice.reducer