import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from "../features/modals/modalsSlice";
import sidedrawerReducer from "../features/sidedrawer/sidedrawerSlice";
import monstersReducer from "../features/monsters/monstersSlice";
import skillsReducer from "../features/skills/skillsSlice";

export const store = configureStore({
	reducer: {
		modals: modalsReducer,
		sidedrawer: sidedrawerReducer,
		monsters: monstersReducer,
		skills: skillsReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
