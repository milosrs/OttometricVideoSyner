import React, { createContext, useState } from "react";
import './app.css'
import { VideoPlayer } from "./components/VideoPlayer";

interface VCProps {
    playAll: boolean;
    stopAll: boolean;
    time: number;
}

export const VideoControl = createContext<VCProps>({
    playAll: false,
    stopAll: false,
    time: 0,
})

export const App = () => {
    const [link, setLink] = useState('');
    const [playAll, setPlayAll] = useState(false);
    const [stopAll, setStopAll] = useState(false);

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
                />
                <div style={{display: 'inline'}}>
                    <button 
                        type="button"
                        className="btn" 
                        onClick={() => {
                            setPlayAll(true);
                            setStopAll(false);
                        }}>
                        Play both
                        </button>
                    <button 
                        className="btn"
                        type="button"
                        onClick={() => {
                            setPlayAll(false);
                            setStopAll(true);
                        }}>
                        Stop both
                    </button>
                </div>
                <div className="container" style={{height: '80%', width: '100%'}}>
                    <div className="player-container">
                        <VideoControl.Provider value={{
                            playAll,
                            stopAll,
                            time: 0,
                        }}>
                            <VideoPlayer title="Video feed 1" url={link}/>
                            <VideoPlayer title="Video feed 2" url={link}/>
                        </VideoControl.Provider>
                    </div>
                </div>
            </div>
        </main>
    )
}