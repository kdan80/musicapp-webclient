import React, { Dispatch, SetStateAction } from 'react'
import styles from './AlbumGrid.module.scss'
import AlbumCard from './AlbumCard'

interface Props {
    albums: Album[]
    setNowPlaying: Dispatch<SetStateAction<Album>>
}

const AlbumGrid: React.FC<Props> = ({albums, setNowPlaying}) => {
    
    return (
        <div className={styles.grid}>
            {
                albums && albums.map((album, index) => (
                    <AlbumCard key={index} album={album} setNowPlaying={setNowPlaying} />
                ))
            }
        </div>
    )
}

export default AlbumGrid