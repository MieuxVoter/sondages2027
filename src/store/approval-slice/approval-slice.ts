import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLatestApprovalSurveyData } from "../../services/ApprovalServices";
import type { ApprobationSurvey } from "../../types/approbation-survey.type";

interface ApprovalState {
    survey: ApprobationSurvey | null;
}

const approvalInitialState: ApprovalState = {
    survey: null,
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
    builder.addCase(loadApprovalData.fulfilled, (state: ApprovalState, action: { payload: ApprobationSurvey }) => {
        state.survey = action.payload;
    });
}

export const loadApprovalData = createAsyncThunk<ApprobationSurvey, void>('approval/load',
    async () => {
        return await getLatestApprovalSurveyData();
    }
);

export const approvalSliceReducer = approvalSlice.reducer;
