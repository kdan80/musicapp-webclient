import React from 'react'
import styles from './Dashboard.module.scss'
import AlbumGrid from 'components/Album/AlbumGrid'

const Dashboard = ({albums, children}) => {
    
    return (
        <div className={styles.dashboard}>
            { children }
        </div>
    )
}

export default Dashboard