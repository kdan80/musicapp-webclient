import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import styles from './VolumeSlider.module.scss'

interface Props {
    volume: number
    setVolume: Dispatch<SetStateAction<number>>
    isMuted: boolean,
    setIsMuted: Dispatch<SetStateAction<boolean>>
}

const VolumeSlider: React.FC<Props> = ({ volume, setVolume, isMuted, setIsMuted }) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseInt(e.target.value))
        if (volume > 0) setIsMuted(false)
    }

    const width = isMuted ? '0%' : `${volume}%`

    return (
        <div
            className={styles.volumeSlider}
            >
            <input 
                onChange={handleChange}
                type='range'
                min={0}
                max={100}
                step={1}
                value={isMuted ? 0 : volume}
                  />
            <div 
                className={styles.volumeSliderTrack} />
            <div 
                className={styles.volumeSliderProgress}
                style={{ width: width}} />
        </div>
    )
}

export default VolumeSlider