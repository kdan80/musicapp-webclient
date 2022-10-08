import React from 'react'
import styles from './MediaButton.module.scss'
import MediaButton from './MediaButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons'

const PlayButton = () => {
    
    return (
        <MediaButton>
            <FontAwesomeIcon 
                className={styles.mediaBtnIcon}
                icon={faPlay} />
        </MediaButton>
    )
}

export default PlayButton