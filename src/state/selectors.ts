import { createSelector } from "@reduxjs/toolkit";
import { State } from "./slice";

const selectVideo = (video: State) => video;

export const selectPlayAll = createSelector(
    selectVideo,
    (video: State) => video.playAll,
)

export const selectSeek = createSelector(
    selectVideo,
    (video: State) => video.playbackTime,
)

export const selectMaster = createSelector(
    selectVideo,
    (video: State) => video.master,
)