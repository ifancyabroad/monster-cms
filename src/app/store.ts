import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from "features/modals/modalsSlice";
import sidedrawerReducer from "features/sidedrawer/sidedrawerSlice";
import monstersReducer from "features/monsters/monstersSlice";
import skillsReducer from "features/skills/skillsSlice";
import weaponsReducer from "features/weapons/weaponsSlice";
import armoursReducer from "features/armours/armoursSlice";
import classesReducer from "features/classes/classesSlice";

export const store = configureStore({
	reducer: {
		modals: modalsReducer,
		sidedrawer: sidedrawerReducer,
		monsters: monstersReducer,
		skills: skillsReducer,
		weapons: weaponsReducer,
		armours: armoursReducer,
		classes: classesReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
