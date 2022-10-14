import React from 'react'
import styles from './ProgressBar.module.scss'

interface Props {
    currentTime: number
    trackDuration: number
}

const ProgressBar: React.FC<Props> = ({currentTime, trackDuration}) => {

    const [width, setWidth] = React.useState<number>(0)

    React.useEffect(() => {
        setWidth(((currentTime / trackDuration)) * 100)
    }, [currentTime, trackDuration])
    
    return (
        <div
            className={styles.progressBar}>
            

            <div 
                className={styles.track} />
            <div 
                className={styles.progress}
                style={{ width: `calc(${width}% + 4px)`}} />

            <input 
                type='range'
                min={0}
                max={trackDuration}
                step={1}
                value={currentTime}/>
        </div>
    )
}

export default ProgressBar