import React from 'react'
import styles from './layout.module.scss'

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.background}/>
            { children }
        </div>
    )
}

export default Layout