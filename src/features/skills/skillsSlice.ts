import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { dbSkills, stImages } from "../../firebaseSetup";
import { ISaveSkill, ISkill, IUpdateSkill } from "../../types";

interface ISkillsState {
	skills: ISkill[];
	skillImagePath: string;
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: ISkillsState = {
	skills: [],
	skillImagePath: "",
	status: "idle",
};

export const fetchSkills = createAsyncThunk(
	"skills/fetchSkills",
	async (payload: ISkill[]) => payload
);

export const fetchSkillImagePath = createAsyncThunk(
	"skills/fetchSkillImagePath",
	async (payload: ISkill) => {
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

export const saveSkill = createAsyncThunk(
	"skills/saveSkill",
	async (payload: ISaveSkill) => {
		try {
			const newSkillRef = dbSkills.push();
			if (payload.image) {
				await stImages
					.child(newSkillRef.key!)
					.child(payload.image.name)
					.put(payload.image);
			}
			return await newSkillRef.set(payload.skill);
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
			return await dbSkills.child(payload.id).update(payload.skill);
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
				await stImages.child(payload.id).child(payload.icon).delete();
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

export const selectSkillImagePath = createSelector(
	skillsSelector,
	({ skillImagePath }) => skillImagePath
);

export const skillsSlice = createSlice({
	name: "skills",
	initialState,
	reducers: {
		clearSkillImagePath: (state) => {
			state.skillImagePath = "";
		},
	},
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
		builder.addCase(fetchSkillImagePath.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchSkillImagePath.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.skillImagePath = action.payload;
		});
		builder.addCase(fetchSkillImagePath.rejected, (state, action) => {
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
export const { clearSkillImagePath } = skillsSlice.actions;

export default skillsSlice.reducer;
