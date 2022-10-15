import React, { createRef, ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import { Radio } from "react-loader-spinner";
import {useDispatch, useSelector} from 'react-redux';
import ReactPlayer from "react-player";
import { match } from "ts-pattern";
import './style.css'
import { playAll, seek, sliderSeek, stopAll } from "../../state/slice";
import { selectMaster, selectPlayAll, selectSeek } from "../../state/selectors";
import { Seeker } from "../Seeker/Seeker";

interface IProps {
    id: number
    url: string
    title: string
}

export const VideoPlayer = ({id, url, title}: IProps) => {
    const play = useSelector(selectPlayAll);
    const time = useSelector(selectSeek);
    const isMaster = useSelector(selectMaster) === id;

    const dispatch = useDispatch();

    const [maxTime, setMaxTime] = useState(0);
    const [pt, setPt] = useState(0);

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
                dispatch(playAll(id))
            }}
            onStart={() => {
                dispatch(playAll(id))
            }}
            onPause={() => {
                dispatch(stopAll())
            }}
            onDuration={(duration) => {
                setMaxTime(duration)
            }}
            onProgress = {(x) => {
                if(seeker.current && videoPlayer.current && play) {
                    const t = videoPlayer.current.getCurrentTime();
                    seeker.current.value = x.playedSeconds.toFixed(2);
                    setPt(t)

                    if(isMaster) {
                        dispatch(seek(parseFloat(videoPlayer.current.getCurrentTime().toFixed(0))))
                    }
                }
            }}
        />
    )
  
    useEffect(() => {
        if(videoPlayer.current && time) {
            const err = videoPlayer.current.getCurrentTime() - time
            if(Math.abs(err) > 0.1) {
                videoPlayer.current.seekTo(time)
            }
        }
    }, [play, time, dispatch, videoPlayer, isMaster])

    return (
        <div className="player">
            <div className="title">{title}</div>
            <div className="content">
                {content}
            </div>
            <label>Time: {pt}</label>
            <Seeker
                maxTime={maxTime} 
                name={title} 
                onChange={(val) =>dispatch(sliderSeek({
                    master: id,
                    time: val,
                }))} 
                ref={seeker}/>
        </div>
    )
}