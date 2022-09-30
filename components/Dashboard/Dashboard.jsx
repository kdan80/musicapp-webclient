import React from 'react'
import styles from './Dashboard.module.scss'
import AlbumGrid from 'components/Album/AlbumGrid'

const Dashboard = ({albums}) => {
    
    return (
        <div className={styles.dashboard}>
            <AlbumGrid albums={albums} />
        </div>
    )
}

export default Dashboard