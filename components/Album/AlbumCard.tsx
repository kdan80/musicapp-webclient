import React, { Dispatch, SetStateAction } from 'react'
import styles from './AlbumCard.module.scss'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

interface Props {
    album: Album
    setNowPlaying: Dispatch<SetStateAction<Album>>
}

const AlbumCard: React.FC<Props> = ({album, setNowPlaying}) => {

    const [buttonClicked, setButtonClicked] = React.useState<boolean>(false)

    const handleClick = () => {
        setButtonClicked(true)
        setTimeout(() => {
            setButtonClicked(false)
        }, 250)
        // TODO: Sort needs to be moved to backend
        album.track_list.sort((a: any, b: any) => a.track_number - b.track_number)
        setNowPlaying(album)
    }

    return (
        <div
            className={styles.card}
            >
            <div
                className={styles.art}> 
                <Image 
                    layout='responsive'
                    height='100%'
                    width='100%' 
                    src={`http://192.168.1.26:9000/media/${album.path}/album_art.jpg`} 
                    alt='album art' />
                <div className={styles.overlay} />
                <button 
                    type='button'
                    className={ buttonClicked ? styles.clicked : undefined }
                    onClick={handleClick}
                    >
                    <FontAwesomeIcon className={styles.playIcon} icon={faPlay} />
                </button>
            </div>
            <div
                className={styles.details}>
                    <div className={styles.title}>{album.title}</div>
                    <div className={styles.artist}>{album.artist}</div>
            </div>
        </div>
    )
}

export default AlbumCard