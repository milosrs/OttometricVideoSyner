import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import './app.css'
import { VideoPlayer } from "./components/VideoPlayer/VideoPlayer";
import { playAll, stopAll } from "./state/slice";


export const App = () => {
    const [link, setLink] = useState('https://www.youtube.com/watch?v=Et_3Bd1zmvY');
    const dispatch = useDispatch();

    return (
        <main>
            <header>
                <div className="title">Welcome to Ottometric Video Syncer</div>
                <h4>Choose a youtube video URL and you'll see the contents on the viewports</h4>
            </header>

            <div className="container" style={{height: '80%'}}>
                <input 
                    className="youtube-input"
                    type="text"
                    placeholder="Paste your url here and press 'Go!'"
                    onKeyDown={(e) => setLink(e.currentTarget.value)}
                    onChange={(e) => setLink(e.currentTarget.value)}
                    value={link}
                />
                <div style={{display: 'inline'}}>
                    <button 
                        type="button"
                        className="btn" 
                        onClick={() => {
                            dispatch(playAll());
                        }}>
                        Play both
                        </button>
                    <button 
                        className="btn"
                        type="button"
                        onClick={() => {
                            dispatch(stopAll());
                        }}>
                        Stop both
                    </button>
                </div>
                <div className="container" style={{height: '80%', width: '100%'}}>
                    <div className="player-container">
                        <VideoPlayer title="Video feed 1" url={link}/>
                        <VideoPlayer title="Video feed 2" url={link}/>
                    </div>
                </div>
            </div>
        </main>
    )
}