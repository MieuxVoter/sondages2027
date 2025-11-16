import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLatestMjSurveyData } from "../../services/MjServices";
import type { Survey } from "../../types/survey.types";

interface MjState {
    jmData: Survey | null;
}

const mjInitialState: MjState = {
    jmData: null,
};

const mjReducers = {
};

const mjSlice = createSlice({
    name: 'majority-judgment',
    initialState: mjInitialState,
    reducers: mjReducers,
    extraReducers: (builder) => {
        handleLoadJmData(builder);
    }
});

function handleLoadJmData(builder: any) {
    builder.addCase(loadMajorityJugmentData.fulfilled, (state: MjState, action: { payload: Survey }) => {
        state.jmData = {...state.jmData, ...action.payload};
    });
}

export const loadMajorityJugmentData = createAsyncThunk<Survey, void>('majority-jugment/load',
    async () => {
        return await getLatestMjSurveyData();
    }
);

export const mjSliceReducer = mjSlice.reducer;
