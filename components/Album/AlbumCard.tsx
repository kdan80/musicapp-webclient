import React from 'react'
import styles from './AlbumCard.module.scss'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

type Track = {
    title: string
    album: string
    artist: string
    disc_number: number
    duration: number
    featured_artists: [string]
    filename: string
    genres: [string]
    nano_id: string
    release_year: number
    track_number: number
}

interface Props {
    album: {
        _id: string
        artist: string
        title: string
        duration: number
        featured_artists: [string]
        release_year: number
        comment: string
        genres: [string]
        number_of_discs: number
        album_art: string
        track_list: [Track]
        path: string
    }
    setNowPlaying: () => void
}

const AlbumCard: React.FC<Props> = ({album, setNowPlaying}) => {

    const [buttonClicked, setButtonClicked] = React.useState<boolean>(false)

    const handleClick = () => {
        setButtonClicked(true)
        setTimeout(() => {
            setButtonClicked(false)
        }, 250)
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