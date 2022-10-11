import React, { Dispatch, SetStateAction } from 'react'
import styles from './MediaButton.module.scss'
import MediaButton from './MediaButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

interface Props {
    isPlaying: boolean
    setIsPlaying: Dispatch<SetStateAction<boolean>>
}

const PlayButton: React.FC<Props> = ({isPlaying, setIsPlaying}) => {

    const handleClick = () => {
        setIsPlaying(prev => !prev)
    }
    
    return (
        <MediaButton clickHandler={handleClick}>
            <FontAwesomeIcon 
                className={styles.mediaBtnIcon}
                icon={isPlaying ? faPause : faPlay} />
        </MediaButton>
    )
}

export default PlayButton