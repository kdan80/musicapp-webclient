import React, { Dispatch, SetStateAction } from 'react'
import styles from './AlbumGrid.module.scss'
import AlbumCard from './AlbumCard'

interface Props {
    albums: Album[]
    setNowPlaying: Dispatch<SetStateAction<NowPlaying | null>>
    setCurrentTrack: Dispatch<SetStateAction<number>>
    setShowMiniPlayer: Dispatch<SetStateAction<boolean>>
}

const AlbumGrid: React.FC<Props> = ({albums, setNowPlaying, setCurrentTrack, setShowMiniPlayer}) => {
    
    return (
        <div className={styles.grid}>
            {
                albums && albums.map((album, index) => (
                    <AlbumCard 
                        key={index} 
                        album={album} 
                        setNowPlaying={setNowPlaying}
                        setCurrentTrack={setCurrentTrack} 
                        setShowMiniPlayer={setShowMiniPlayer}
                        priority={(index < 40)} />
                ))
            }
        </div>
    )
}

export default AlbumGrid