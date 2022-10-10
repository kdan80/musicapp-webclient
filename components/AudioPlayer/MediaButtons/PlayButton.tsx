import React from 'react'
import styles from './MediaButton.module.scss'
import MediaButton from './MediaButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

const PlayButton = () => {

    const [paused, setPaused] = React.useState<boolean>(false)
    
    const handleClick = () => {
        setPaused(prev => !prev)
    }
    
    return (
        <MediaButton clickHandler={handleClick}>
            <FontAwesomeIcon 
                className={styles.mediaBtnIcon}
                icon={paused ? faPause : faPlay} />
        </MediaButton>
    )
}

export default PlayButton