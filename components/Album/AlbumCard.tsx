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
}

const AlbumCard: React.FC<Props> = ({album}) => {

    const [showButton, setShowButton] = React.useState<boolean>(false)

    return (
        <div
            className={styles.card}
            onMouseEnter={() => setShowButton(true)}
            onMouseLeave={() => setShowButton(false)}
            >
            <div
                className={styles.art}> 
                <Image 
                    layout='responsive'
                    height='100%'
                    width='100%' 
                    src={`http://192.168.1.26:9000/media/${album.path}/album_art.jpg`} 
                    alt='album art' />
                <button 
                    type='button'
                    className='playButton'
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


// <motion.button 
//                     type='button'
//                     layout
//                     initial='hide'
//                     animate={ showButton ? 'show' : undefined}
//                     whileHover={{
//                         scale: 1.2,
//                         backgroundColor: 'rgba(22, 155, 69, .9)',
//                         transition: { duration: .15 },
//                     }}
//                     transition={{
//                         duration: .15
//                     }}
//                     variants={buttonVariants}
//                     >