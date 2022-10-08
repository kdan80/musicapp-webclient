import React from 'react'
import styles from './AudioPlayer.module.scss'
import ProgressBar from './ProgressBar'
import PlayButton from './MediaButtons/PlayButton'
import SkipForward from './MediaButtons/SkipForward'
import SkipBackward from './MediaButtons/SkipBackward'

const AudioPlayer = () => {

    return (
        <div className={styles.player}>
            <div className={styles.flexContainer}>
                <div
                    className={styles.nowPlaying}>
                        
                        {/* Left panel - img & info */}
                        <div className={styles.nowPlayingInfo}>
                            <div className={styles.nowPlayingImg}></div>
                            <div className={styles.nowPlayingDetails}>
                                <div className={styles.nowPlayingSongTitle}>The Chain (Remastered)</div>
                                <div className={styles.nowPlayingArtist}>Fleetwood Mac</div>
                            </div>
                        </div>

                        {/* Center panel - play controls */}
                        <div className={styles.nowPlayingControls}>
                            <SkipBackward />
                            <PlayButton />
                            <SkipForward />
                        </div>

                        {/* Right panel - volume controls */}
                        <div className={styles.nowPlayingVolControls}>
                            Vol controls
                        </div>
                </div>
                <ProgressBar />
            </div>
            <div className={styles.mobileSpacer} />
        </div>
    )
}

export default AudioPlayer