import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import axios from "axios";

const SCHEDULER_DATA = "https://blazor.syncfusion.com/services/production/api/schedule";
const initialState = {
    dataSource: [],
    status: "idle",
    error: null
}

export const fetchData = createAsyncThunk("scheduler/data", async () => {
    const response = await axios.get(SCHEDULER_DATA);
    return response.data;
})

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        updateDataSource: (state, action) => {
            produce(state, (draft) => {
                draft.dataSource.push(action.payload);
            })
            //state.dataSource = [...state.dataSource, action.payload];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchData.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = "success"
                state.dataSource = action.payload
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message;
            })
    }
})


export const postStatus = (state) => state.status
export const postError = (state) => state.error
export const { updateDataSource } = dataSlice.actions
export default dataSlice.reducer;