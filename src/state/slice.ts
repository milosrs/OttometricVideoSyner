import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    playAll: false,
    playbackTime: undefined as number | undefined,
}

export type State = typeof initialState;

const error = 0.06

const videoSlice = createSlice({
    name: 'VideoSlice',
    initialState: initialState,
    reducers: {
        playAll: (state: State) => {
            state.playAll = true;
        },
        stopAll: (state: State) => {
            state.playAll = false;
        },
        seek: (state: State, action: PayloadAction<number>) => {
            state.playbackTime = action.payload;
        }
    }
})

export const {playAll, seek, stopAll} = videoSlice.actions;
const video = videoSlice.reducer;

export default video;