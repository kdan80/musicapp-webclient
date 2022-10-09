import React from 'react'
import styles from './MediaButton.module.scss'

interface Props {
    children: any
    className?: string
    clickHandler?: () => void
}

const MediaButton: React.FC<Props> = ({children, className, clickHandler}) => {

    const [buttonClicked, setButtonClicked] = React.useState<boolean>(false)

    const handleClick = () => {
        setButtonClicked(true)
        setTimeout(() => {
            setButtonClicked(false)
        }, 300)
        if (clickHandler) clickHandler()
    }
    
    const mediaBtn = `${styles.mediaBtn} ${className}`
    const mediaBtnClicked = `${mediaBtn} ${styles.mediaBtnClicked}`

    return (
        <button
            type='button'
            onClick={handleClick}
            className={buttonClicked ? mediaBtnClicked : mediaBtn}>
            {
                children
            }
        </button>
    )
}

export default MediaButton