import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMonster, ISkill } from "../../types";

interface ModalsState {
	loginModalOpen: boolean;
	confirmationModalOpen: boolean;
	monsterModal: {
		open: boolean;
		monster?: IMonster;
	};
	skillModal: {
		open: boolean;
		skill?: ISkill;
	};
}

const initialState: ModalsState = {
	loginModalOpen: false,
	confirmationModalOpen: false,
	monsterModal: {
		open: false,
	},
	skillModal: {
		open: false,
	},
};

export const modalsSlice = createSlice({
	name: "modals",
	initialState,
	reducers: {
		openLoginModal: (state) => {
			state.loginModalOpen = true;
		},
		closeLoginModal: (state) => {
			state.loginModalOpen = false;
		},
		openConfirmationModal: (state) => {
			state.confirmationModalOpen = true;
		},
		closeConfirmationModal: (state) => {
			state.confirmationModalOpen = false;
		},
		openMonsterModal: (
			state,
			action: PayloadAction<IMonster | undefined>
		) => {
			state.monsterModal.open = true;
			state.monsterModal.monster = action.payload;
		},
		closeMonsterModal: (state) => {
			state.monsterModal.open = false;
			state.monsterModal.monster = undefined;
		},
		openSkillModal: (state, action: PayloadAction<ISkill | undefined>) => {
			state.skillModal.open = true;
			state.skillModal.skill = action.payload;
		},
		closeSkillModal: (state) => {
			state.skillModal.open = false;
			state.skillModal.skill = undefined;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	openLoginModal,
	closeLoginModal,
	openConfirmationModal,
	closeConfirmationModal,
	openMonsterModal,
	closeMonsterModal,
	openSkillModal,
	closeSkillModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
