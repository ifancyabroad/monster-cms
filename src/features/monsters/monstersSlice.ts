import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { dbMonsters, stImages } from '../../firebaseSetup';
import { IMonster, ISaveMonster } from '../../types';

interface IMonstersState {
    monsters: IMonster[];
    monsterImagePath: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
  }

const initialState: IMonstersState = {
    monsters: [],
    monsterImagePath: "",
    status: 'idle',
}

export const fetchMonsters = createAsyncThunk('monsters/fetchMonsters', async (payload: IMonster[]) => payload);

export const fetchMonsterImagePath = createAsyncThunk('monsters/fetchMonsterImagePath', async (payload: string) => {
    try {
        return await stImages.child(payload).getDownloadURL();
    } catch (error) {
        console.error(error);
    }
});

export const saveMonster = createAsyncThunk('monsters/saveMonster', async (payload: ISaveMonster) => {
    try {
        if (payload.image) {
            await stImages.child(payload.image.name).put(payload.image);
        }
        return await dbMonsters.push(payload.monster);
    } catch (error) {
        console.error(error);
    }
});

export const deleteMonster = createAsyncThunk('monsters/deleteMonster', async (payload: IMonster) => {
    try {
        if (payload.portrait) {
            await stImages.child(payload.portrait).delete();
        }
        return await dbMonsters.child(payload.id).remove();
    } catch (error) {
        console.error(error);
    }
});

export const monstersSelector = (state: RootState) => state.monsters;

export const selectMonsterById = createSelector(
    monstersSelector,
    ({monsters}) => (id: string) => monsters.find(monster => monster.id === id)
);

export const selectMonsterImagePath = createSelector(
    monstersSelector,
    ({monsterImagePath}) => monsterImagePath
);

export const monstersSlice = createSlice({
    name: 'monsters',
    initialState,
    reducers: {
        clearMonsterImagePath: (state) => {
            state.monsterImagePath = ""
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchMonsters.pending, (state, action) => {
            state.status = 'loading';
        })
        builder.addCase(fetchMonsters.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.monsters = action.payload;
        })
        builder.addCase(fetchMonsters.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        builder.addCase(fetchMonsterImagePath.pending, (state, action) => {
            state.status = 'loading';
        })
        builder.addCase(fetchMonsterImagePath.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.monsterImagePath = action.payload;
        })
        builder.addCase(fetchMonsterImagePath.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        builder.addCase(saveMonster.pending, (state, action) => {
            state.status = 'loading';
        })
        builder.addCase(saveMonster.fulfilled, (state) => {
            state.status = 'succeeded';
        })
        builder.addCase(saveMonster.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        builder.addCase(deleteMonster.pending, (state, action) => {
            state.status = 'loading';
        })
        builder.addCase(deleteMonster.fulfilled, (state) => {
            state.status = 'succeeded';
        })
        builder.addCase(deleteMonster.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

// Action creators are generated for each case reducer function
export const { clearMonsterImagePath } = monstersSlice.actions

export default monstersSlice.reducer