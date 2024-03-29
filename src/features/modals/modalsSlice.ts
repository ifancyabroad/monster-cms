import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	IArmour,
	ICharacterClass,
	IMonster,
	ISkill,
	ISkillEffect,
	IWeapon,
	TProperty,
} from "common/types";

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
	classModal: {
		open: boolean;
		characterClass?: ICharacterClass;
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
	propertyModal: {
		open: boolean;
		property?: TProperty;
		index?: number;
	};
	addSkillsModalOpen: boolean;
	addEquipmentModalOpen: boolean;
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
	classModal: {
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
	propertyModal: {
		open: false,
	},
	addSkillsModalOpen: false,
	addEquipmentModalOpen: false,
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
		openClassModal: (
			state,
			action: PayloadAction<ICharacterClass | undefined>
		) => {
			state.classModal.open = true;
			state.classModal.characterClass = action.payload;
		},
		closeClassModal: (state) => {
			state.classModal.open = false;
			state.classModal.characterClass = undefined;
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
		openPropertyModal: (
			state,
			action: PayloadAction<{ property?: TProperty; index?: number }>
		) => {
			state.propertyModal.open = true;
			state.propertyModal.property = action.payload.property;
			state.propertyModal.index = action.payload.index;
		},
		closePropertyModal: (state) => {
			state.propertyModal.open = false;
			state.propertyModal.property = undefined;
			state.propertyModal.index = undefined;
		},
		openAddSkillsModal: (state) => {
			state.addSkillsModalOpen = true;
		},
		closeAddSkillsModal: (state) => {
			state.addSkillsModalOpen = false;
		},
		openAddEquipmentModal: (state) => {
			state.addEquipmentModalOpen = true;
		},
		closeAddEquipmentModal: (state) => {
			state.addEquipmentModalOpen = false;
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
	openClassModal,
	closeClassModal,
	openSkillModal,
	closeSkillModal,
	openWeaponModal,
	closeWeaponModal,
	openArmourModal,
	closeArmourModal,
	openEffectModal,
	closeEffectModal,
	openPropertyModal,
	closePropertyModal,
	openAddSkillsModal,
	closeAddSkillsModal,
	openAddEquipmentModal,
	closeAddEquipmentModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
