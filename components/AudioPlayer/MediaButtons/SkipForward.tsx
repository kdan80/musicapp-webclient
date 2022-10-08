import React from 'react'
import styles from './MediaButton.module.scss'
import MediaButton from './MediaButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForwardStep } from '@fortawesome/free-solid-svg-icons'

const SkipForward = () => {
    return (
        <MediaButton
            className={styles.hiddenBtn}
            >
            <FontAwesomeIcon 
                className={styles.mediaBtnIcon}
                icon={faForwardStep} />
        </MediaButton>
    )
}

export default SkipForward