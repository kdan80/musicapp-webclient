import React from 'react'
import styles from './Dashboard.module.scss'

interface Props {
    children: React.ReactNode
}

const Dashboard: React.FC<Props> = ({children}) => {
    
    return (
        <div className={styles.dashboard}>
            { children }
        </div>
    )
}

export default Dashboard