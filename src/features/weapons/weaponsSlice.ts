import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { dbWeapons, stImages } from "firebaseSetup";
import { ISaveWeapon, IUpdateWeapon, IWeapon } from "common/types";
import { WeaponSize } from "common/utils";

interface IWeaponsState {
	weapons: IWeapon[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: IWeaponsState = {
	weapons: [],
	status: "idle",
};

export const fetchWeapons = createAsyncThunk(
	"weapons/fetchWeapons",
	async (payload: IWeapon[]) => payload
);

const deleteImage = async (key: string) => {
	try {
		await stImages.child("weapons").child(key).delete();
	} catch (error) {
		console.error(error);
	}
};

export const saveWeapon = createAsyncThunk(
	"weapons/saveWeapon",
	async (payload: ISaveWeapon) => {
		try {
			const newWeaponRef = dbWeapons.push();
			const newWeapon = { ...payload.weapon };
			if (payload.image) {
				const imageRef = stImages
					.child("weapons")
					.child(newWeaponRef.key!);
				await imageRef.put(payload.image);
				newWeapon.icon = await imageRef.getDownloadURL();
			}
			return await newWeaponRef.set(newWeapon);
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
			const newWeapon = { ...payload.weapon };
			if (payload.image && payload.oldImage) {
				await deleteImage(payload.id);
			}
			if (payload.image) {
				const imageRef = stImages.child("weapons").child(payload.id);
				await imageRef.put(payload.image);
				newWeapon.icon = await imageRef.getDownloadURL();
			}
			return await dbWeapons.child(payload.id).update(newWeapon);
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
				await deleteImage(payload.id);
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

export const isTwoHandedWeapon = createSelector(
	weaponsSelector,
	({ weapons }) =>
		(id: string) =>
			weapons.find((weapon) => weapon.id === id)?.size ===
			WeaponSize.TwoHanded
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
