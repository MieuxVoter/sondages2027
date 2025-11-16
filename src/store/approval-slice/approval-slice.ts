import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Survey } from "../../types/survey.types";
import { getLatestApprovalSurveyData } from "../../services/ApprovalServices";

interface MjState {
    jmData: Survey | null;
}

const approvalInitialState: MjState = {
    jmData: null,
};

const mjReducers = {
};

const approvalSlice = createSlice({
    name: 'approval',
    initialState: approvalInitialState,
    reducers: mjReducers,
    extraReducers: (builder) => {
        handleLoadApprovalData(builder);
    }
});

function handleLoadApprovalData(builder: any) {
    builder.addCase(loadApprovalData.fulfilled, (state: MjState, action: { payload: Survey }) => {
        state.jmData = {...state.jmData, ...action.payload};
    });
}

export const loadApprovalData = createAsyncThunk<Survey, void>('approval/load',
    async () => {
        return await getLatestApprovalSurveyData();
    }
);

export const approvalSliceReducer = approvalSlice.reducer;
