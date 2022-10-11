import React, { SetStateAction, Dispatch } from 'react'
import styles from './MediaButton.module.scss'
import MediaButton from './MediaButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

interface Props {
    isMuted: boolean
    setIsMuted: Dispatch<SetStateAction<boolean>>
}

const Mute: React.FC<Props> = ({ isMuted, setIsMuted }) => {

    const handleClick = () => {
        setIsMuted(prev => !prev)
    }

    return (
        <MediaButton clickHandler={handleClick} >
            <FontAwesomeIcon 
                className={styles.mediaBtnIcon}
                icon={isMuted ? faVolumeMute : faVolumeUp} />
        </MediaButton>
    )
}

export default Mute