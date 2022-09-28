import React from 'react'
import styles from './optionsList.module.scss'

const OptionsList = () => {

    const [option, setOption] = React.useState('albums')
    const albumsBtn = React.useRef<HTMLButtonElement | null>(null)
    const artistsBtn = React.useRef<HTMLButtonElement | null>(null)
    const songsBtn = React.useRef<HTMLButtonElement | null>(null)
    const genresBtn = React.useRef<HTMLButtonElement | null>(null)

    const setDashboardContext = (e: React.MouseEvent<HTMLButtonElement>) => {
        const name = (e.target as HTMLButtonElement).getAttribute('name')
        if (name) return setOption(name)
        return setOption('albums')
    }

    React.useEffect(() => {
        switch (option) {
            case 'albums':
                albumsBtn.current && albumsBtn.current.focus()
                break
            case 'artists': 
                artistsBtn.current && artistsBtn.current.focus()
                break
            case 'songs': 
                songsBtn.current && songsBtn.current.focus()
                break
            case 'genres': 
                genresBtn.current && genresBtn.current.focus()
                break
            default:
                albumsBtn.current && albumsBtn.current.focus()
        }
    }, [option])

    return (
        <div
            className={styles.optionsList}>
                <button 
                    onClick={setDashboardContext}
                    ref={albumsBtn}
                    name='albums'
                    className={styles.option}>
                        Albums
                </button>
                <button 
                    onClick={setDashboardContext}
                    ref={artistsBtn}
                    name='artists'
                    className={styles.option}>
                        Artists
                </button>
                <button 
                    onClick={setDashboardContext}
                    ref={songsBtn}
                    name='songs'
                    className={styles.option}>
                        Songs
                </button>
                <button 
                    onClick={setDashboardContext}
                    ref={genresBtn}
                    name='genres'
                    className={styles.option}>
                        Genres
                </button>
        </div>
    )
}

export default OptionsList