import React from 'react'
import styles from './AudioPlayer.module.scss'
import ProgressBar from './ProgressBar'
import PlayButton from './MediaButtons/PlayButton'
import SkipForward from './MediaButtons/SkipForward'
import SkipBackward from './MediaButtons/SkipBackward'
import Image from 'next/image'
import Mute from './MediaButtons/Mute'
import VolumeSlider from './MediaButtons/VolumeSlider'

const AudioPlayer = ({nowPlaying}) => {

    return (
        <div className={styles.player}>
            <div className={styles.flexContainer}>
                <div
                    className={styles.nowPlaying}>
                        
                        {/* Left panel - img & info */}
                        <div className={styles.nowPlayingInfo}>
                            {/* <img src='/album_art.jpg' className={styles.nowPlayingImg} alt='album art' /> */}
                            <Image 
                                className={styles.nowPlayingImg}
                                layout='fixed'
                                height={50}
                                width={50} 
                                src='/album_art.jpg'
                                alt='album art' />
                            <div className={styles.nowPlayingDetails}>
                                <div className={styles.nowPlayingSongTitle}>The Chain (Remastered)</div>
                                <div className={styles.nowPlayingArtist}>Fleetwood Mac</div>
                            </div>
                            <div className={styles.nowPlayingProgress}>
                                2:10 / 3:20
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
                            <Mute />
                            <VolumeSlider />
                        </div>
                </div>
                <ProgressBar />
            </div>
            <div className={styles.mobileSpacer} />
            {
                nowPlaying.length && (
                    <audio>
                        <source src={`http:192.168.1.21:4000/stream/${nowPlaying[0].nano_id}`} type="audio/mpeg"/>
                    </audio>
                )
            }
        </div>
    )
}

export default AudioPlayer