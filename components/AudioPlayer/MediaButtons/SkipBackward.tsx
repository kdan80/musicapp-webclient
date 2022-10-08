import React from 'react'
import styles from './MediaButton.module.scss'
import MediaButton from './MediaButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons'

const SkipBackward = () => {
    return (
        <MediaButton
            className={styles.hiddenBtn}>
            <FontAwesomeIcon 
                className={styles.mediaBtnIcon}
                icon={faBackwardStep} />
        </MediaButton>
    )
}

export default SkipBackward