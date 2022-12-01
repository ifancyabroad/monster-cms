import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMonster, ISkill } from "../../types";

interface ModalsState {
	loginModalOpen: boolean;
	monsterModal: {
		open: boolean;
		monster?: IMonster;
	};
	deleteMonsterModal: {
		open: boolean;
		monster?: IMonster;
	};
	skillModal: {
		open: boolean;
		skill?: ISkill;
	};
	deleteSkillModal: {
		open: boolean;
		skill?: ISkill;
	};
}

const initialState: ModalsState = {
	loginModalOpen: false,
	monsterModal: {
		open: false,
	},
	deleteMonsterModal: {
		open: false,
	},
	skillModal: {
		open: false,
	},
	deleteSkillModal: {
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
		openDeleteMonsterModal: (
			state,
			action: PayloadAction<IMonster | undefined>
		) => {
			state.deleteMonsterModal.open = true;
			state.deleteMonsterModal.monster = action.payload;
		},
		closeDeleteMonsterModal: (state) => {
			state.deleteMonsterModal.open = false;
			state.deleteMonsterModal.monster = undefined;
		},
		openSkillModal: (state, action: PayloadAction<ISkill | undefined>) => {
			state.skillModal.open = true;
			state.skillModal.skill = action.payload;
		},
		closeSkillModal: (state) => {
			state.skillModal.open = false;
			state.skillModal.skill = undefined;
		},
		openDeleteSkillModal: (
			state,
			action: PayloadAction<ISkill | undefined>
		) => {
			state.deleteSkillModal.open = true;
			state.deleteSkillModal.skill = action.payload;
		},
		closeDeleteSkillModal: (state) => {
			state.deleteSkillModal.open = false;
			state.deleteSkillModal.skill = undefined;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	openLoginModal,
	closeLoginModal,
	openMonsterModal,
	closeMonsterModal,
	openDeleteMonsterModal,
	closeDeleteMonsterModal,
	openSkillModal,
	closeSkillModal,
	openDeleteSkillModal,
	closeDeleteSkillModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
