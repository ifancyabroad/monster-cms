import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { dbMonsters, stImages } from '../../firebaseSetup';
import { IMonster, ISaveMonster } from '../../types';

interface IMonstersState {
    monsters: IMonster[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
  }

const initialState: IMonstersState = {
    monsters: [],
    status: 'idle',
}

export const fetchMonsters = createAsyncThunk('monsters/fetchMonsters', async (payload: IMonster[]) => payload);

export const saveMonster = createAsyncThunk('monsters/saveMonster', async (payload: ISaveMonster) => {
    try {
        await stImages.child(payload.image.name).put(payload.image);
        return await dbMonsters.push(payload.monster);
    } catch (error) {
        console.error(error);
    }
})

export const monstersSelector = (state: RootState) => state.monsters.monsters;
export const selectMonsterById = createSelector(
    monstersSelector,
    (monsters) => (id: string) => monsters.find(monster => monster.id === id)
);

export const monstersSlice = createSlice({
    name: 'monsters',
    initialState,
    reducers: {},
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
    }
})

// Action creators are generated for each case reducer function
// export const { } = monstersSlice.actions

export default monstersSlice.reducer