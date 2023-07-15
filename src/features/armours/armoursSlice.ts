import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { dbArmours, stImages } from "firebaseSetup";
import { IArmour, ISaveArmour, IUpdateArmour } from "common/types";

interface IArmoursState {
	armours: IArmour[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: IArmoursState = {
	armours: [],
	status: "idle",
};

export const fetchArmours = createAsyncThunk(
	"armours/fetchArmours",
	async (payload: IArmour[]) => payload
);

const deleteImage = async (key: string) => {
	try {
		await stImages.child("armours").child(key).delete();
	} catch (error) {
		console.error(error);
	}
};

export const saveArmour = createAsyncThunk(
	"armours/saveArmour",
	async (payload: ISaveArmour) => {
		try {
			const newArmourRef = dbArmours.push();
			const newArmour = { ...payload.armour };
			if (payload.image) {
				const imageRef = stImages
					.child("armours")
					.child(newArmourRef.key!);
				await imageRef.put(payload.image);
				newArmour.icon = await imageRef.getDownloadURL();
			}
			return await newArmourRef.set(newArmour);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const updateArmour = createAsyncThunk(
	"armours/updateArmour",
	async (payload: IUpdateArmour) => {
		try {
			const newArmour = { ...payload.armour };
			if (payload.image && payload.oldImage) {
				await deleteImage(payload.id);
			}
			if (payload.image) {
				const imageRef = stImages.child("armours").child(payload.id);
				await imageRef.put(payload.image);
				newArmour.icon = await imageRef.getDownloadURL();
			}
			return await dbArmours.child(payload.id).update(newArmour);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const deleteArmour = createAsyncThunk(
	"armours/deleteArmour",
	async (payload: IArmour) => {
		try {
			if (payload.icon) {
				await deleteImage(payload.id);
			}
			return await dbArmours.child(payload.id).remove();
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const armoursSelector = (state: RootState) => state.armours;

export const selectArmourById = createSelector(
	armoursSelector,
	({ armours }) =>
		(id: string) =>
			armours.find((armour) => armour.id === id)
);

export const armoursSlice = createSlice({
	name: "armours",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchArmours.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchArmours.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.armours = action.payload;
		});
		builder.addCase(fetchArmours.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(saveArmour.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(saveArmour.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(saveArmour.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(deleteArmour.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(deleteArmour.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(deleteArmour.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(updateArmour.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(updateArmour.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(updateArmour.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { } = armoursSlice.actions;

export default armoursSlice.reducer;
