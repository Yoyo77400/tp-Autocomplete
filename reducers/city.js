import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        addCity: (state, action) => {
            state.value.push(action.payload);
        }
    }
})

export default citySlice.reducer;
export const {addCity} = citySlice.actions