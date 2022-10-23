import React, { Dispatch, SetStateAction } from 'react'
import styles from './TrackList.module.scss'
import Image from 'next/image'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

interface Props {
    album: Album
    setShowTrackList: Dispatch<SetStateAction<boolean>>
    setCurrentTrack: Dispatch<SetStateAction<number>>
    currentTrack: number
}

const TrackList: React.FC<Props> = ({album, setShowTrackList, setCurrentTrack, currentTrack}) => {

    const {title, track_list} = album


    return (
        <div className={styles.trackListContainer}>
            <div className={styles.header}>
                    <button 
                        className={styles.headerButton}>
                        <FontAwesomeIcon 
                            onClick={() => setShowTrackList(false)}
                            icon={faArrowLeft} />
                    </button>
                    <div className={styles.headerTitle}>
                        {title}
                    </div>
            </div>
            <ul className={styles.trackList}>
                {
                    track_list.map((track, index) => (
                        <li 
                            onClick={() => setCurrentTrack(index)}
                            className={
                                (index === currentTrack)
                                    ? `${styles.trackListItem} ${styles.currentTrack}`
                                    : `${styles.trackListItem}`
                                
                            }
                            key={index}>
                                <div className={styles.trackNumber}>
                                    {track.track_number}
                                </div>
                                <div className={styles.imgWrapper}>
                                    <Image
                                        layout={'fill'}
                                        objectFit={'cover'}
                                        src={`/albumart/${album._id}.webP`}
                                        alt='album art'
                                        //placeholder='blur' 
                                        />
                                </div>
                                <div className={styles.trackTitle}>
                                    {track.title}
                                </div>
                                <div className={styles.trackDuration}>
                                    {moment(track.duration * 1000).format('m:ss')}
                                </div>

                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TrackList