import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import { mjSliceReducer } from './jm-slice/jm-slice';
import { approvalSliceReducer } from './approval-slice/approval-slice';
import { smpSliceReducer } from './smp-slice/smp-slice';

const initialState = {
    lang: "en",
    error: "",
};
const globalSlice = createSlice({
    name: 'global',
    initialState: initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<string>) {
            state.lang = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    }
});
export const {
    setLanguage,
    setError,
} = globalSlice.actions;

enableMapSet();

export const store = configureStore({
    reducer: {
        global: globalSlice.reducer,
        majorityJudgment: mjSliceReducer,
        approval: approvalSliceReducer,
        smp: smpSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



