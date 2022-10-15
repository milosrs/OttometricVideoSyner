import React, { createRef, ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import { Radio } from "react-loader-spinner";
import {useDispatch, useSelector} from 'react-redux';
import ReactPlayer from "react-player";
import { match } from "ts-pattern";
import './style.css'
import { playAll, seek, stopAll } from "../../state/slice";
import { selectPlayAll, selectSeek } from "../../state/selectors";
import { Seeker } from "../Seeker/Seeker";

interface IProps {
    url: string
    title: string
}

export const VideoPlayer = ({url, title}: IProps) => {
    const play = useSelector(selectPlayAll);
    const time = useSelector(selectSeek);

    const dispatch = useDispatch();
    const [maxTime, setMaxTime] = useState(0);
    
    const notYoutubeCheck = (url: string) => !(url.includes('http://www.youtube.com') || url.includes('youtube.com') || url.includes('youtu.be'))

    const videoPlayer = createRef<ReactPlayer>();
    const seeker = createRef<HTMLInputElement>();

    const content = match(url)
    .when(
        (u: string) => u === '', 
        () => <div className="spinner">
            <Radio
                visible={true}
                height="80"
                width="80"
                ariaLabel="radio-loading"
               />
               <div>Waiting for an url...</div>
        </div>
    )
    .when(
        notYoutubeCheck, 
        () => <div className='error-msg'><p>URL Provided is not a YouTube link</p></div>
    )
    .otherwise(() => 
        <ReactPlayer
            ref={videoPlayer}
            playing={play}
            style={{margin: 'auto', display: 'block'}} 
            url={url}
            onPlay={() => {
                dispatch(playAll())
            }}
            onStart={() => {
                dispatch(playAll())
            }}
            onPause={() => {
                dispatch(stopAll())

                if(videoPlayer.current) {
                    dispatch(seek(videoPlayer.current.getCurrentTime()))
                }
            }}
            onDuration={(duration) => {
                setMaxTime(duration)
            }}
            onEnded={() => {
                dispatch(seek(0))
            }}
            onProgress = {(x) => {
                if(seeker.current) {
                    seeker.current.value = x.playedSeconds.toString();
                }
            }}
        />
    )
  

    useEffect(() => {
        if(videoPlayer.current && time) {
            videoPlayer.current.seekTo(time)
        }
    }, [play, time, dispatch, videoPlayer])

    return (
        <div className="player">
            <div className="title">{title}</div>
            <div className="content">
                {content}
            </div>
            <Seeker maxTime={maxTime} name={title} onChange={(val) => dispatch(seek(val))} ref={seeker}/>            
        </div>
    )
}