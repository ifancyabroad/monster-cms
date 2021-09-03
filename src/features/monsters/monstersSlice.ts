import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dbMonsters } from '../../firebaseSetup';
import { Monster } from '../../types';

interface MonstersState {
    monsters: Monster[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
  }

const initialState: MonstersState = {
    monsters: [],
    status: 'idle',
}

export const fetchMonsters = createAsyncThunk('monsters/fetchMonsters', async (monsters: Monster[]) => monsters);

export const saveMonster = createAsyncThunk('monsters/saveMonster', async (monster: Omit<Monster, "id">) => {
    try {
        return await dbMonsters.push(monster);
    } catch (error) {
        console.error(error);
    }
})

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