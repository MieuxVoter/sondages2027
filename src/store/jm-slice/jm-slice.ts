import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLatestMjSurveyData } from "../../services/MjServices";
import type { MjSurvey } from "../../types/mj-survey.types";

interface MjState {
    jmData: MjSurvey | null;
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
    builder.addCase(loadMajorityJugmentData.fulfilled, (state: MjState, action: { payload: MjSurvey }) => {
        state.jmData = action.payload;
    });
}

export const loadMajorityJugmentData = createAsyncThunk<MjSurvey, void>('majority-jugment/load',
    async () => {
        return await getLatestMjSurveyData();
    }
);

export const mjSliceReducer = mjSlice.reducer;
