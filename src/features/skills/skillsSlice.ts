import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { dbSkills, stImages } from "firebaseSetup";
import { ISaveSkill, ISkill, IUpdateSkill } from "common/types";

interface ISkillsState {
	skills: ISkill[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: ISkillsState = {
	skills: [],
	status: "idle",
};

export const fetchSkills = createAsyncThunk(
	"skills/fetchSkills",
	async (payload: ISkill[]) => payload
);

const deleteImage = async (key: string) => {
	try {
		await stImages.child("skills").child(key).delete();
	} catch (error) {
		console.error(error);
	}
};

export const saveSkill = createAsyncThunk(
	"skills/saveSkill",
	async (payload: ISaveSkill) => {
		try {
			const newSkillRef = dbSkills.push();
			const newSkill = { ...payload.skill };
			if (payload.image) {
				const imageRef = stImages
					.child("skills")
					.child(newSkillRef.key!);
				await imageRef.put(payload.image);
				newSkill.icon = await imageRef.getDownloadURL();
			}
			return await newSkillRef.set(newSkill);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const updateSkill = createAsyncThunk(
	"skills/updateSkill",
	async (payload: IUpdateSkill) => {
		try {
			const newSkill = { ...payload.skill };
			if (payload.image && payload.oldImage) {
				await deleteImage(payload.id);
			}
			if (payload.image) {
				const imageRef = stImages.child("skills").child(payload.id);
				await imageRef.put(payload.image);
				newSkill.icon = await imageRef.getDownloadURL();
			}
			return await dbSkills.child(payload.id).update(newSkill);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const deleteSkill = createAsyncThunk(
	"skills/deleteSkill",
	async (payload: ISkill) => {
		try {
			if (payload.icon) {
				await deleteImage(payload.id);
			}
			return await dbSkills.child(payload.id).remove();
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const skillsSelector = (state: RootState) => state.skills;

export const selectSkillById = createSelector(
	skillsSelector,
	({ skills }) =>
		(id: string) =>
			skills.find((skill) => skill.id === id)
);

export const skillsSlice = createSlice({
	name: "skills",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSkills.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchSkills.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.skills = action.payload;
		});
		builder.addCase(fetchSkills.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(saveSkill.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(saveSkill.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(saveSkill.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(deleteSkill.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(deleteSkill.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(deleteSkill.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(updateSkill.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(updateSkill.fulfilled, (state) => {
			state.status = "succeeded";
		});
		builder.addCase(updateSkill.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { } = skillsSlice.actions;

export default skillsSlice.reducer;
