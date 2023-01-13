import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { dbWeapons, stImages } from "../../firebaseSetup";
import { IImagePath, ISaveWeapon, IUpdateWeapon, IWeapon } from "../../types";

interface IWeaponsState {
	weapons: IWeapon[];
	weaponImagePaths: IImagePath[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: IWeaponsState = {
	weapons: [],
	weaponImagePaths: [],
	status: "idle",
};

export const fetchWeapons = createAsyncThunk(
	"weapons/fetchWeapons",
	async (payload: IWeapon[]) => payload
);

export const fetchWeaponImagePath = createAsyncThunk(
	"weapons/fetchWeaponImagePath",
	async (payload: IWeapon) => {
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

export const saveWeapon = createAsyncThunk(
	"weapons/saveWeapon",
	async (payload: ISaveWeapon) => {
		try {
			const newWeaponRef = dbWeapons.push();
			if (payload.image) {
				await stImages
					.child(newWeaponRef.key!)
					.child(payload.image.name)
					.put(payload.image);
			}
			return await newWeaponRef.set(payload.weapon);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const updateWeapon = createAsyncThunk(
	"weapons/updateWeapon",
	async (payload: IUpdateWeapon) => {
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
			return await dbWeapons.child(payload.id).update(payload.weapon);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const deleteWeapon = createAsyncThunk(
	"weapons/deleteWeapon",
	async (payload: IWeapon) => {
		try {
			if (payload.icon) {
				await stImages.child(payload.id).child(payload.icon).delete();
			}
			return await dbWeapons.child(payload.id).remove();
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const weaponsSelector = (state: RootState) => state.weapons;

export const selectWeaponById = createSelector(
	weaponsSelector,
	({ weapons }) =>
		(id: string) =>
			weapons.find((weapon) => weapon.id === id)
);

export const selectWeaponImagePathById = createSelector(
	weaponsSelector,
	({ weaponImagePaths }) =>
		(id: string) =>
			weaponImagePaths.find((weaponImage) => weaponImage.id === id)
				?.imagePath
);

export const weaponsSlice = createSlice({
	name: "weapons",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchWeapons.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchWeapons.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.weapons = action.payload;
		});
		builder.addCase(fetchWeapons.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(fetchWeaponImagePath.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchWeaponImagePath.fulfilled, (state, action) => {
			const newWeaponImage = {
				id: action.meta.arg.id,
				imagePath: action.payload,
			};

			state.status = "succeeded";
			state.weaponImagePaths = state.weaponImagePaths
				.filter((weaponImage) => weaponImage.id !== newWeaponImage.id)
				.concat(newWeaponImage);
		});
		builder.addCase(fetchWeaponImagePath.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(saveWeapon.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(saveWeapon.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(saveWeapon.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(deleteWeapon.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(deleteWeapon.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(deleteWeapon.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(updateWeapon.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(updateWeapon.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(updateWeapon.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { } = weaponsSlice.actions;

export default weaponsSlice.reducer;
