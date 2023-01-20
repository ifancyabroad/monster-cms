import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { dbArmours, stImages } from "../../firebaseSetup";
import { IArmour, IImagePath, ISaveArmour, IUpdateArmour } from "../../types";

interface IArmoursState {
	armours: IArmour[];
	armourImagePaths: IImagePath[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: IArmoursState = {
	armours: [],
	armourImagePaths: [],
	status: "idle",
};

export const fetchArmours = createAsyncThunk(
	"armours/fetchArmours",
	async (payload: IArmour[]) => payload
);

export const fetchArmourImagePath = createAsyncThunk(
	"armours/fetchArmourImagePath",
	async (payload: IArmour) => {
		try {
			return await stImages
				.child(payload.id)
				.child(payload.icon)
				.getDownloadURL();
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const saveArmour = createAsyncThunk(
	"armours/saveArmour",
	async (payload: ISaveArmour) => {
		try {
			const newArmourRef = dbArmours.push();
			if (payload.image) {
				await stImages
					.child(newArmourRef.key!)
					.child(payload.image.name)
					.put(payload.image);
			}
			return await newArmourRef.set(payload.armour);
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
			if (payload.image && payload.oldImage) {
				await stImages
					.child(payload.id)
					.child(payload.oldImage)
					.delete();
			}
			if (payload.image) {
				await stImages
					.child(payload.id)
					.child(payload.image.name)
					.put(payload.image);
			}
			return await dbArmours.child(payload.id).update(payload.armour);
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
				await stImages.child(payload.id).child(payload.icon).delete();
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

export const selectArmourImagePathById = createSelector(
	armoursSelector,
	({ armourImagePaths }) =>
		(id: string) =>
			armourImagePaths.find((armourImage) => armourImage.id === id)
				?.imagePath
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
		builder.addCase(fetchArmourImagePath.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchArmourImagePath.fulfilled, (state, action) => {
			const newArmourImage = {
				id: action.meta.arg.id,
				imagePath: action.payload,
			};

			state.status = "succeeded";
			state.armourImagePaths = state.armourImagePaths
				.filter((armourImage) => armourImage.id !== newArmourImage.id)
				.concat(newArmourImage);
		});
		builder.addCase(fetchArmourImagePath.rejected, (state, action) => {
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
