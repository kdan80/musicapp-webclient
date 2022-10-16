import React, { Dispatch, SetStateAction} from 'react'
import styles from './AudioPlayer.module.scss'
import Image from 'next/image'
import PlayButton from './MediaButtons/PlayButton'
import SkipButton from './MediaButtons/SkipButton'
import ProgressBar from './ProgressBar'
import moment from 'moment'
import TrackList from 'components/TrackList/TrackList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

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

const AudioPlayer: React.FC<Props> = ({
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

    const [showTrackList, setShowTrackList] = React.useState<boolean>(false)

    const {title, artist, track_list} = album

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
                        className={styles.headerButton}>
                        <FontAwesomeIcon 
                            onClick={() => setShowTrackList(true)}
                            icon={faEllipsisV} />
                    </button>
            </div>

            <div className={styles.imgWrapper}>
                <Image
                    layout={'fill'}
                    objectFit={'cover'}
                    src={`http://192.168.1.26:9000/media/${album.path}/album_art.jpg`}
                    alt='album art' />
            </div>

            {
                showTrackList && (
                    <div className={styles.trackListWrapper}>
                        <TrackList
                            album={album}
                            setShowTrackList={setShowTrackList}
                            setCurrentTrack={setCurrentTrack}
                            currentTrack={currentTrack}
                            />
                    </div>
                )
            }

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
                        <SkipButton 
                            skipBackward={true}
                            currentTrack={currentTrack}
                            setCurrentTrack={setCurrentTrack}
                            numberOfTracks={12} />
                        <PlayButton 
                                isPlaying={isPlaying} 
                                setIsPlaying={setIsPlaying} />
                        <SkipButton 
                            skipBackward={false}
                            currentTrack={currentTrack}
                            setCurrentTrack={setCurrentTrack}
                            numberOfTracks={12} />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AudioPlayer