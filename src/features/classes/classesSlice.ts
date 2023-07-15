import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { dbClasses, stImages } from "firebaseSetup";
import { ICharacterClass, ISaveClass, IUpdateClass } from "common/types";

interface IClassesState {
	classes: ICharacterClass[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: IClassesState = {
	classes: [],
	status: "idle",
};

export const fetchClasses = createAsyncThunk(
	"classes/fetchClasses",
	async (payload: ICharacterClass[]) => payload
);

const deleteImage = async (key: string) => {
	try {
		await stImages.child("classes").child(key).delete();
	} catch (error) {
		console.error(error);
	}
};

export const saveClass = createAsyncThunk(
	"classes/saveClass",
	async (payload: ISaveClass) => {
		try {
			const newClassRef = dbClasses.push();
			const newClass = { ...payload.characterClass };
			if (payload.image) {
				const imageRef = stImages
					.child("classes")
					.child(newClassRef.key!);
				await imageRef.put(payload.image);
				newClass.portrait = await imageRef.getDownloadURL();
			}
			return await newClassRef.set(newClass);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const updateClass = createAsyncThunk(
	"classes/updateClass",
	async (payload: IUpdateClass) => {
		try {
			const newClass = { ...payload.characterClass };
			if (payload.image && payload.oldImage) {
				await deleteImage(payload.id);
			}
			if (payload.image) {
				const imageRef = stImages.child("classes").child(payload.id);
				await imageRef.put(payload.image);
				newClass.portrait = await imageRef.getDownloadURL();
			}
			return await dbClasses.child(payload.id).update(newClass);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const deleteClass = createAsyncThunk(
	"classes/deleteClass",
	async (payload: ICharacterClass) => {
		try {
			if (payload.portrait) {
				await deleteImage(payload.id);
			}
			return await dbClasses.child(payload.id).remove();
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const classesSelector = (state: RootState) => state.classes;

export const selectClassById = createSelector(
	classesSelector,
	({ classes }) =>
		(id: string) =>
			classes.find((characterClass) => characterClass.id === id)
);

export const classesSlice = createSlice({
	name: "classes",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchClasses.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchClasses.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.classes = action.payload;
		});
		builder.addCase(fetchClasses.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(saveClass.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(saveClass.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(saveClass.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(deleteClass.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(deleteClass.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(deleteClass.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(updateClass.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(updateClass.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(updateClass.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { } = classesSlice.actions;

export default classesSlice.reducer;
