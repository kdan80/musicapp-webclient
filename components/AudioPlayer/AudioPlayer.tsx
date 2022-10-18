import React, { Dispatch, SetStateAction} from 'react'
import styles from './AudioPlayer.module.scss'
import Image from 'next/image'
import PlayButton from './MediaButtons/PlayButton'
import SkipButton from './MediaButtons/SkipButton'
import ProgressBar from './ProgressBar'
import Mute from './MediaButtons/Mute'
import VolumeSlider from './MediaButtons/VolumeSlider'
import moment from 'moment'
import TrackList from 'components/TrackList/TrackList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

interface Props {
    nowPlaying: NowPlaying | null
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

const AudioPlayer: React.FC<Props> = ({
        nowPlaying,
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

    const [showTrackList, setShowTrackList] = React.useState<boolean>(false)

    const {title, artist, track_list} = nowPlaying!.album

    const minimizeAudioPlayer = () => {
        setShowAudioPlayer(false)
        setShowMiniPlayer(true)
    }

    return (
        
        <div className={styles.audioPlayer}>

            <div    
                className={styles.header}
                >
                    <button 
                        className={styles.headerButton}>
                        <FontAwesomeIcon 
                            onClick={minimizeAudioPlayer}
                            icon={faArrowLeft} />
                    </button>
                    <button 
                        className={`${styles.headerButton} ${styles.trackListButton}`}>
                        <FontAwesomeIcon 
                            onClick={() => setShowTrackList(true)}
                            icon={faEllipsisV} />
                    </button>
            </div>

                <div className={styles.middle}>
                    <div className={styles.imgContainer}>
                        <div className={styles.imgWrapper}>
                            <Image
                                layout={'fill'}
                                objectFit={'cover'}
                                src={`http://192.168.1.26:9000/media/${nowPlaying!.album.path}/album_art.jpg`}
                                alt='album art' />
                        </div>
                    </div>


                    <div className={styles.bottom}>
                        <div className={styles.info}>
                            <div className={styles.infoSongTitle}>{track_list[currentTrack].title}</div>
                            <div className={styles.infoAlbumTitle}>{title}</div>
                            <div className={styles.infoArtist}>{artist}</div>
                        </div>

                        <div className={styles.controls}>
                            <div className={styles.progress}>
                                <div>{moment(currentTime).format('m:ss')}</div>
                                <ProgressBar
                                    currentTime={currentTime}
                                    trackDuration={trackDuration}
                                    setSkipToTimestamp={setSkipToTimestamp}/>
                                <div>{moment(trackDuration).format('m:ss')}</div>
                            </div>
                            <div className={styles.buttons}>
                                <div className={styles.buttonsTrack}>
                                    <SkipButton 
                                        skipBackward={true}
                                        currentTrack={currentTrack}
                                        setCurrentTrack={setCurrentTrack}
                                        numberOfTracks={track_list.length} />
                                    <PlayButton 
                                            isPlaying={isPlaying} 
                                            setIsPlaying={setIsPlaying} />
                                    <SkipButton 
                                        skipBackward={false}
                                        currentTrack={currentTrack}
                                        setCurrentTrack={setCurrentTrack}
                                        numberOfTracks={track_list.length} />
                                </div>
                                <div className={styles.buttonsVol}>
                                    <Mute
                                        isMuted={isMuted}
                                        setIsMuted={setIsMuted}/>
                                    <VolumeSlider
                                        isMuted={isMuted}
                                        setIsMuted={setIsMuted}
                                        volume={volume}
                                        setVolume={setVolume} />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div className={styles.trackList}>
                    <TrackList
                                album={nowPlaying!.album}
                                setShowTrackList={setShowTrackList}
                                setCurrentTrack={setCurrentTrack}
                                currentTrack={currentTrack}/>
                </div>

            {/* Pop up variant of TrackList for mobile UI */}
            {
                showTrackList && (
                    <div className={styles.trackListWrapper}>
                        <TrackList
                            album={nowPlaying!.album}
                            setShowTrackList={setShowTrackList}
                            setCurrentTrack={setCurrentTrack}
                            currentTrack={currentTrack}/>
                    </div>
                )
            }
        </div>
    )
}

export default AudioPlayer