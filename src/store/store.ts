import { configureStore } from "@reduxjs/toolkit";
import video from "../state/slice";

export const store = configureStore({
    reducer: video,
    devTools: true, 
})