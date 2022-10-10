import React from 'react'
import styles from './MediaButton.module.scss'
import MediaButton from './MediaButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons'

const PauseButton = () => {
    
    return (
        <MediaButton>
            <FontAwesomeIcon 
                className={styles.mediaBtnIcon}
                icon={faPause} />
        </MediaButton>
    )
}

export default PauseButton