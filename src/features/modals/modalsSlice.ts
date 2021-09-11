import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMonster } from '../../types';

interface ModalsState {
	loginModalOpen: boolean;
	monsterModal: {
		open: boolean;
		monster?: IMonster;
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
		openMonsterModal: (state, action: PayloadAction<IMonster | undefined>) => {
			state.monsterModal.open = true
			state.monsterModal.monster = action.payload
		},
		closeMonsterModal: (state) => {
			state.monsterModal.open = false
			state.monsterModal.monster = undefined
		},
	},
})

// Action creators are generated for each case reducer function
export const { openLoginModal, closeLoginModal, openMonsterModal, closeMonsterModal } = modalsSlice.actions

export default modalsSlice.reducer