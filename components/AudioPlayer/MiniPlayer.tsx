import React, { Dispatch, SetStateAction } from 'react'
import styles from './MiniPlayer.module.scss'
import ProgressBar from './ProgressBar'
import PlayButton from './MediaButtons/PlayButton'
import SkipButton from './MediaButtons/SkipButton'
import Image from 'next/image'
import Mute from './MediaButtons/Mute'
import VolumeSlider from './MediaButtons/VolumeSlider'
import moment from 'moment'

interface Props {
    album: Album
    trackDuration: number
    currentTrack: number
    setCurrentTrack: Dispatch<SetStateAction<number>>
    isPlaying: boolean
    setIsPlaying: Dispatch<SetStateAction<boolean>>
    isMuted: boolean
    setIsMuted: Dispatch<SetStateAction<boolean>>
    volume: number
    currentTime: number
    setVolume: Dispatch<SetStateAction<number>>
    setSkipToTimestamp: Dispatch<SetStateAction<number>>
    setShowMiniPlayer: Dispatch<SetStateAction<boolean>>
    setShowAudioPlayer: Dispatch<SetStateAction<boolean>>
}

const MiniPlayer: React.FC<Props> = ({
        album,
        trackDuration,
        currentTrack, setCurrentTrack,
        currentTime,
        isPlaying, setIsPlaying, 
        isMuted, setIsMuted,
        volume, setVolume,
        setSkipToTimestamp,
        setShowMiniPlayer,
        setShowAudioPlayer
    }) => {

    const { title, artist, track_list } = album
    
    
    const handleClick = (e: any) => {
        // if ( e.target === e.currentTarget ) {
        //     setShowAudioPlayer(true)
        //     return setShowMiniPlayer(false)
        // }
        setShowAudioPlayer(true)
        return setShowMiniPlayer(false)
    }

    return (
        <div className={styles.player}>

            <div className={styles.flexContainer}>
                <div className={styles.nowPlaying}>
                        
                        {/* Left panel - img & info */}
                        <div className={styles.nowPlayingInfo}
                            onClick={handleClick}>
                            <Image 
                                className={styles.nowPlayingImg}
                                layout='fixed'
                                height={50}
                                width={50} 
                                src={`http://192.168.1.26:9000/media/${album.path}/album_art.jpg`}
                                alt='album art' />
                            <div className={styles.nowPlayingDetails}>
                                <div className={styles.nowPlayingSongTitle}>{track_list[currentTrack].title}</div>
                                <div className={styles.nowPlayingArtist}>{artist}</div>
                            </div>
                            <div className={styles.nowPlayingProgress}>
                                {moment(currentTime).format('m:ss')} / {moment(trackDuration).format('m:ss')}
                            </div>
                        </div>

                        {/* Center panel - play controls */}
                        <div className={styles.nowPlayingControls}>
                            <SkipButton 
                                currentTrack={currentTrack} 
                                setCurrentTrack={setCurrentTrack} 
                                numberOfTracks={track_list.length} 
                                hiddenBtn
                                skipBackward={true} />
                            <PlayButton 
                                isPlaying={isPlaying} 
                                setIsPlaying={setIsPlaying} />
                            <SkipButton 
                                currentTrack={currentTrack} 
                                setCurrentTrack={setCurrentTrack} 
                                numberOfTracks={track_list.length} 
                                hiddenBtn
                                skipBackward={false} />
                        </div>

                        {/* Right panel - volume controls */}
                        <div className={styles.nowPlayingVolControls}>
                            <Mute 
                                isMuted={isMuted}
                                setIsMuted={setIsMuted} />
                            <VolumeSlider 
                                isMuted={isMuted}
                                setIsMuted={setIsMuted}
                                volume={volume}
                                setVolume={setVolume} />
                        </div>
                </div>
                <ProgressBar 
                    currentTime={currentTime} 
                    trackDuration={trackDuration}
                    setSkipToTimestamp={setSkipToTimestamp}
                    />
            </div>
            <div className={styles.mobileSpacer} />
        </div>
    )
}

export default MiniPlayer