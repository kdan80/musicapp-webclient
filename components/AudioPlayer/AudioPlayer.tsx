import React from 'react'
import styles from './AudioPlayer.module.scss'
import ProgressBar from './ProgressBar'
import PlayButton from './MediaButtons/PlayButton'
import SkipButton from './MediaButtons/SkipButton'
import Image from 'next/image'
import Mute from './MediaButtons/Mute'
import VolumeSlider from './MediaButtons/VolumeSlider'
import moment from 'moment'

const AudioPlayer = ({album}) => {

    const { title, artist, track_list } = album
    track_list.sort((a: any, b: any) => a.track_number - b.track_number)
    const [isPlaying, setIsPlaying] = React.useState<boolean>(true)
    const [trackDuration, setTrackDuration] = React.useState<string>('0:00')
    const [volume, setVolume] = React.useState<number>(100)
    const [isMuted, setIsMuted] = React.useState<boolean>(false)
    const [currentTrack, setCurrentTrack] = React.useState<number>(0)
    const audioPlayerRef = React.useRef<HTMLAudioElement | null>(null)

    const getAudioSrc = (trackNumber: number) => {
        return `http://192.168.1.26:9000/media/${artist}/${title}/${track_list[trackNumber].filename}` 
    }
    const [audioSrc, setAudioSrc] = React.useState<string>(getAudioSrc(0))

    const getNextTrack = () => {
        let track = 0
        if (currentTrack < track_list.length) {
            track = currentTrack + 1
        }
        const src = getAudioSrc(track)
        setCurrentTrack(track)
        setAudioSrc(src)
        return
    }

    // Get current song duration
    React.useEffect(() => {
        const durationInMilliSecs = track_list[currentTrack].duration * 1000
        const duration = moment(durationInMilliSecs).format("m:ss")
        setTrackDuration(duration)
    }, [currentTrack, track_list])

    // Play & pause functionality
    React.useEffect(() => {
        if (isPlaying) {
            audioPlayerRef.current?.play()
        } else {
            audioPlayerRef.current?.pause()
        }
    }, [isPlaying])

    // Skip track functionality
    React.useEffect(() => {
        const src = getAudioSrc(currentTrack)
        setAudioSrc(src)
    }, [currentTrack, getAudioSrc])

    // Volume control
    React.useEffect(() => {
        if (audioPlayerRef.current) audioPlayerRef.current.volume = volume / 100
    }, [volume])

    return (
        <div className={styles.player}>

            <div className={styles.flexContainer}>
                <div
                    className={styles.nowPlaying}>
                        
                        {/* Left panel - img & info */}
                        <div className={styles.nowPlayingInfo}>
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
                                2:10 / {trackDuration}
                            </div>
                        </div>

                        {/* Center panel - play controls */}
                        <div className={styles.nowPlayingControls}>
                            <SkipButton 
                                currentTrack={currentTrack} 
                                setCurrentTrack={setCurrentTrack} 
                                numberOfTracks={track_list.length} 
                                skipBackward={true} />
                            <PlayButton 
                                isPlaying={isPlaying} 
                                setIsPlaying={setIsPlaying} />
                            <SkipButton 
                                currentTrack={currentTrack} 
                                setCurrentTrack={setCurrentTrack} 
                                numberOfTracks={track_list.length} 
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
                <ProgressBar />
            </div>
            <div className={styles.mobileSpacer} />
            
            {/* This audio player is hidden. The code above is used for the UI */}
            <audio 
                controls={false} 
                src={audioSrc} 
                autoPlay={true} 
                ref={audioPlayerRef}
                onPlay={() => setIsPlaying(true)} 
                onPause={() => setIsPlaying(false)}
                onEnded={getNextTrack}  
                muted={isMuted} />
        </div>
    )
}

export default AudioPlayer