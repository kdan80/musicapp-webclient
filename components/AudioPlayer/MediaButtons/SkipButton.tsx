import React, { Dispatch, SetStateAction } from 'react'
import styles from './MediaButton.module.scss'
import MediaButton from './MediaButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForwardStep, faBackwardStep } from '@fortawesome/free-solid-svg-icons'

interface Props {
    currentTrack: number
    setCurrentTrack: Dispatch<SetStateAction<number>>
    numberOfTracks: number
    skipBackward: boolean
    hiddenBtn?: true
}

const SkipButton: React.FC<Props> = ({currentTrack, setCurrentTrack, numberOfTracks, skipBackward, hiddenBtn}) => {
    
    const skipTrackForward = () => {
        if (currentTrack < (numberOfTracks - 1)) return setCurrentTrack(prev => prev + 1)
        return setCurrentTrack(0)
    }

    const skipTrackBackward = () => {
        if (currentTrack > 0) return setCurrentTrack(prev => prev - 1)
        return setCurrentTrack(numberOfTracks - 1)
    }

    return (
        <MediaButton 
            clickHandler={skipBackward ? skipTrackBackward : skipTrackForward }
            className={hiddenBtn ? styles.hiddenBtn : undefined }
            >
            <FontAwesomeIcon 
                className={styles.mediaBtnIcon}
                icon={skipBackward ? faBackwardStep : faForwardStep} />
        </MediaButton>
    )
}

export default SkipButton