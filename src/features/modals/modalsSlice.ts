import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMonster, ISkill, ISkillEffect } from "../../types";

interface ModalsState {
	loginModalOpen: boolean;
	confirmationModalOpen: boolean;
	errorModal: {
		open: boolean;
		title?: string;
		message?: string;
	};
	monsterModal: {
		open: boolean;
		monster?: IMonster;
	};
	skillModal: {
		open: boolean;
		skill?: ISkill;
	};
	effectModal: {
		open: boolean;
		effect?: ISkillEffect;
		index?: number;
	};
	addSkillsModalOpen: boolean;
}

const initialState: ModalsState = {
	loginModalOpen: false,
	confirmationModalOpen: false,
	errorModal: {
		open: false,
	},
	monsterModal: {
		open: false,
	},
	skillModal: {
		open: false,
	},
	effectModal: {
		open: false,
	},
	addSkillsModalOpen: false,
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
		openErrorModal: (
			state,
			action: PayloadAction<{ title?: string; message?: string }>
		) => {
			state.errorModal.open = true;
			state.errorModal.title = action.payload.title;
			state.errorModal.message = action.payload.message;
		},
		closeErrorModal: (state) => {
			state.errorModal.open = false;
			state.errorModal.title = undefined;
			state.errorModal.message = undefined;
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
		openEffectModal: (
			state,
			action: PayloadAction<{ effect?: ISkillEffect; index?: number }>
		) => {
			state.effectModal.open = true;
			state.effectModal.effect = action.payload.effect;
			state.effectModal.index = action.payload.index;
		},
		closeEffectModal: (state) => {
			state.effectModal.open = false;
			state.effectModal.effect = undefined;
			state.effectModal.index = undefined;
		},
		openAddSkillsModal: (state) => {
			state.addSkillsModalOpen = true;
		},
		closeAddSkillsModal: (state) => {
			state.addSkillsModalOpen = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	openLoginModal,
	closeLoginModal,
	openConfirmationModal,
	closeConfirmationModal,
	openErrorModal,
	closeErrorModal,
	openMonsterModal,
	closeMonsterModal,
	openSkillModal,
	closeSkillModal,
	openEffectModal,
	closeEffectModal,
	openAddSkillsModal,
	closeAddSkillsModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
