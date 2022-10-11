import React from "react";
import { useContext } from "react";
import { Radio } from "react-loader-spinner";
import ReactPlayer from "react-player";
import { match } from "ts-pattern";
import { VideoControl } from "../App";
import './style.css'

interface IProps {
    url: string
    title: string
}

export const VideoPlayer = ({url, title}: IProps) => {
    const ctx = useContext(VideoControl)
    const notYoutubeCheck = (url: string) => !(url.includes('http://www.youtube.com') || url.includes('youtube.com') || url.includes('youtu.be'))

    const content = match(url)
    .when(
        (u: string) => u === '', 
        () => <div className="spinner">
            <Radio
                visible={true}
                height="80"
                width="80"
                ariaLabel="radio-loading"
                wrapperStyle={{
                }}
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
            playing={ctx.playAll}
            style={{margin: 'auto', display: 'block'}} 
            url={url}
        />
    )

    return (
        <div className="player">
            <div className="title">{title}</div>
            <div className="content">
                {content}
            </div>
        </div>
    )
}