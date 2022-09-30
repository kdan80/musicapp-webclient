import React from 'react'
import styles from './AlbumCard.module.scss'
import Image from 'next/image'

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

    return (
        <div
            className={styles.card}>

            <div
                className={styles.art}> 
                {/* <Image src='./' alt='album art' /> */}
            </div>
            <div
                className={styles.details}>
                    <div>{album.title}</div>
                    <div>{album.artist}</div>
            </div>
        </div>
    )
}

export default AlbumCard