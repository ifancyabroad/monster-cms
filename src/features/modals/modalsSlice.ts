import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArmour, IMonster, ISkill, ISkillEffect, IWeapon } from "../../types";

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
	weaponModal: {
		open: boolean;
		weapon?: IWeapon;
	};
	armourModal: {
		open: boolean;
		armour?: IArmour;
	};
	effectModal: {
		open: boolean;
		effect?: ISkillEffect;
		index?: number;
	};
	addSkillsModalOpen: boolean;
	addWeaponsModalOpen: boolean;
	addArmoursModalOpen: boolean;
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
	weaponModal: {
		open: false,
	},
	armourModal: {
		open: false,
	},
	effectModal: {
		open: false,
	},
	addSkillsModalOpen: false,
	addWeaponsModalOpen: false,
	addArmoursModalOpen: false,
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
		openWeaponModal: (
			state,
			action: PayloadAction<IWeapon | undefined>
		) => {
			state.weaponModal.open = true;
			state.weaponModal.weapon = action.payload;
		},
		closeWeaponModal: (state) => {
			state.weaponModal.open = false;
			state.weaponModal.weapon = undefined;
		},
		openArmourModal: (
			state,
			action: PayloadAction<IArmour | undefined>
		) => {
			state.armourModal.open = true;
			state.armourModal.armour = action.payload;
		},
		closeArmourModal: (state) => {
			state.armourModal.open = false;
			state.armourModal.armour = undefined;
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
		openAddWeaponsModal: (state) => {
			state.addWeaponsModalOpen = true;
		},
		closeAddWeaponsModal: (state) => {
			state.addWeaponsModalOpen = false;
		},
		openAddArmoursModal: (state) => {
			state.addArmoursModalOpen = true;
		},
		closeAddArmoursModal: (state) => {
			state.addArmoursModalOpen = false;
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
	openWeaponModal,
	closeWeaponModal,
	openArmourModal,
	closeArmourModal,
	openEffectModal,
	closeEffectModal,
	openAddSkillsModal,
	closeAddSkillsModal,
	openAddWeaponsModal,
	closeAddWeaponsModal,
	openAddArmoursModal,
	closeAddArmoursModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
