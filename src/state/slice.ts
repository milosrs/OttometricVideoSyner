import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    playAll: false,
    playbackTime: undefined as number | undefined,
    master: undefined as number | undefined,
}

export type State = typeof initialState;

interface SeekEvent {
    master: number;
    time: number;
}

const videoSlice = createSlice({
    name: 'VideoSlice',
    initialState: initialState,
    reducers: {
        playAll: (state: State, action: PayloadAction<number>) => {
            state.playAll = true;

            if(state.master === undefined) {
                state.master = action.payload
            }
        },
        stopAll: (state: State) => {
            state.playAll = false;
            state.master = undefined;
        },
        seek: (state: State, action: PayloadAction<number | undefined>) => {
            state.playbackTime = action.payload
        },
        sliderSeek: (state: State, action: PayloadAction<SeekEvent>) => {
            state.master = action.payload.master
            state.playbackTime = action.payload.time
        }
    }
})

export const {playAll, seek, sliderSeek, stopAll} = videoSlice.actions;
const video = videoSlice.reducer;

export default video;