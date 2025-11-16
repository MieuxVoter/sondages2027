import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLatestApprovalSurveyData } from "../../services/ApprovalServices";
import type { MjSurvey } from "../../types/mj-survey.types";

interface MjState {
    jmData: MjSurvey | null;
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
    builder.addCase(loadApprovalData.fulfilled, (state: MjState, action: { payload: MjSurvey }) => {
        state.jmData = action.payload;
    });
}

export const loadApprovalData = createAsyncThunk<MjSurvey, void>('approval/load',
    async () => {
        return await getLatestApprovalSurveyData();
    }
);

export const approvalSliceReducer = approvalSlice.reducer;
