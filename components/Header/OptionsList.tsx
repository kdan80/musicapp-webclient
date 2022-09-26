import React from 'react'
import styles from './optionsList.module.scss'

const OptionsList = () => {

    const [option, setOption] = React.useState('albums')

    const setDashboardContext = (e: React.MouseEvent<HTMLButtonElement>) => {
        const name = (e.target as HTMLButtonElement).getAttribute('name')
        if (name) return setOption(name)
        return setOption('albums')
    }

    console.log(option)

    return (
        <div
            className={styles.optionsList}>
                <button 
                    onClick={setDashboardContext}
                    name='albums'
                    className={styles.option}>
                        Albums
                </button>
                <button 
                    onClick={setDashboardContext}
                    name='artists'
                    className={styles.option}>
                        Artists
                </button>
                <button 
                    onClick={setDashboardContext}
                    name='songs'
                    className={styles.option}>
                        Songs
                </button>
                <button 
                    onClick={setDashboardContext}
                    name='genres'
                    className={styles.option}>
                        Genres
                </button>
        </div>
    )
}

export default OptionsList