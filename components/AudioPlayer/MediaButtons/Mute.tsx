import React from 'react'
import styles from './MediaButton.module.scss'
import MediaButton from './MediaButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

const Mute = () => {

    const [muted, setMuted] = React.useState<boolean>(false)
    
    const handleClick = () => {
        setMuted(prev => !prev)
    }

    return (
        <MediaButton clickHandler={handleClick} >
            <FontAwesomeIcon 
                className={styles.mediaBtnIcon}
                icon={muted ? faVolumeMute : faVolumeUp} />
        </MediaButton>
    )
}

export default Mute