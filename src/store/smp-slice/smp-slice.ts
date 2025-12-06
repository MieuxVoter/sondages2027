import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLatestSmpSurveyData } from "../../services/SmpServices";
import type { SmpSurvey } from "../../types/smp-survey.types";

interface SmpState {
    survey: SmpSurvey | null;
    loading: boolean;
    error: string | null;
}

const smpInitialState: SmpState = {
    survey: null,
    loading: false,
    error: null,
};

const smpSlice = createSlice({
    name: 'smp',
    initialState: smpInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSmpData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadSmpData.fulfilled, (state, action) => {
                state.survey = action.payload;
                state.loading = false;
            })
            .addCase(loadSmpData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Erreur de chargement';
            });
    }
});

export const loadSmpData = createAsyncThunk<SmpSurvey, void>('smp/load',
    async () => {
        return await getLatestSmpSurveyData();
    }
);

export const smpSliceReducer = smpSlice.reducer;
