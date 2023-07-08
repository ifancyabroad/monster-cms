import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { dbMonsters, stImages } from "firebaseSetup";
import {
	IImagePath,
	IMonster,
	ISaveMonster,
	IUpdateMonster,
} from "common/types";

interface IMonstersState {
	monsters: IMonster[];
	monsterImagePaths: IImagePath[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: IMonstersState = {
	monsters: [],
	monsterImagePaths: [],
	status: "idle",
};

export const fetchMonsters = createAsyncThunk(
	"monsters/fetchMonsters",
	async (payload: IMonster[]) => payload
);

const deleteImage = async (key: string) => {
	try {
		await stImages.child("monsters").child(key).delete();
	} catch (error) {
		console.error(error);
	}
};

export const saveMonster = createAsyncThunk(
	"monsters/saveMonster",
	async (payload: ISaveMonster) => {
		try {
			const newMonsterRef = dbMonsters.push();
			const newMonster = { ...payload.monster };
			if (payload.image) {
				const imageRef = stImages
					.child("monsters")
					.child(newMonsterRef.key!);
				await imageRef.put(payload.image);
				newMonster.portrait = await imageRef.getDownloadURL();
			}
			return await newMonsterRef.set(newMonster);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const updateMonster = createAsyncThunk(
	"monsters/updateMonster",
	async (payload: IUpdateMonster) => {
		try {
			const newMonster = { ...payload.monster };
			if (payload.image && payload.oldImage) {
				await deleteImage(payload.id);
			}
			if (payload.image) {
				const imageRef = stImages.child("monsters").child(payload.id);
				await imageRef.put(payload.image);
				newMonster.portrait = await imageRef.getDownloadURL();
			}
			return await dbMonsters.child(payload.id).update(newMonster);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const deleteMonster = createAsyncThunk(
	"monsters/deleteMonster",
	async (payload: IMonster) => {
		try {
			if (payload.portrait) {
				await deleteImage(payload.id);
			}
			return await dbMonsters.child(payload.id).remove();
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const monstersSelector = (state: RootState) => state.monsters;

export const selectMonsterById = createSelector(
	monstersSelector,
	({ monsters }) =>
		(id: string) =>
			monsters.find((monster) => monster.id === id)
);

export const monstersSlice = createSlice({
	name: "monsters",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchMonsters.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchMonsters.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.monsters = action.payload;
		});
		builder.addCase(fetchMonsters.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(saveMonster.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(saveMonster.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(saveMonster.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(deleteMonster.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(deleteMonster.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(deleteMonster.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(updateMonster.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(updateMonster.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(updateMonster.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { } = monstersSlice.actions;

export default monstersSlice.reducer;
