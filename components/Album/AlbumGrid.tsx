import React from 'react'
import styles from './AlbumGrid.module.scss'
import AlbumCard from './AlbumCard'

const AlbumGrid = ({albums}) => {
    
    return (
        <div className={styles.grid}>
            {
                albums && albums.map((album, index) => (
                    <AlbumCard key={index} album={album}/>
                ))
            }
        </div>
    )
}

export default AlbumGrid