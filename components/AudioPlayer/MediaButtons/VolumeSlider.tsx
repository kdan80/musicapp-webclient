import React, { ChangeEvent } from 'react'
import styles from './VolumeSlider.module.scss'


const VolumeSlider = () => {

    const [volume, setVolume] = React.useState<number>(100)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseInt(e.target.value))
    }

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
                value={volume}
                  />
            <div 
                className={styles.volumeSliderTrack} />
            <div 
                className={styles.volumeSliderProgress}
                style={{ width: `${volume}%`}} />
        </div>
    )
}

export default VolumeSlider