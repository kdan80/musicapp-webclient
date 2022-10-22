import React, { Dispatch, SetStateAction } from 'react'
import styles from './AlbumCard.module.scss'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { AuthContext } from 'components/auth/AuthContext'
import { useRouter } from 'next/router'

interface Props {
    album: Album
    setNowPlaying: Dispatch<SetStateAction<NowPlaying | null>>
    setCurrentTrack: Dispatch<SetStateAction<number>>
    setShowMiniPlayer: Dispatch<SetStateAction<boolean>>
}

const AlbumCard: React.FC<Props> = ({album, setNowPlaying, setCurrentTrack, setShowMiniPlayer}) => {

    const { logoutUser } = React.useContext(AuthContext)
    const router = useRouter()
    const [buttonClicked, setButtonClicked] = React.useState<boolean>(false)

    const handleClick = async() => {
        setButtonClicked(true)
        setTimeout(() => {
            setButtonClicked(false)
        }, 250)
        // TODO: Sort needs to be moved to backend
        album.track_list.sort((a: any, b: any) => a.track_number - b.track_number)

        try {
            const response = await axios({
                method: 'get',
                url: `${process.env.PRESIGNED_URL_ENDPOINT}/${album._id}`,
                withCredentials: true
            })

            setNowPlaying({
                album: album,
                presignedUrls: response.data.presignedUrls
            })
            setShowMiniPlayer(false)
            return setCurrentTrack(0)
        } catch(err) {
            logoutUser()
            return router.push('/login')
        }
    }

    return (
        <div
            className={styles.card}
            >
            <div
                className={styles.art}> 
                <Image 
                    layout='responsive'
                    height='100%'
                    width='100%' 
                    src={`/albumart/${album._id}.jpg`}
                    alt='album art'
                    priority />
                <div className={styles.overlay} />
                <button 
                    type='button'
                    className={ buttonClicked ? styles.clicked : undefined }
                    onClick={handleClick}
                    >
                    <FontAwesomeIcon className={styles.playIcon} icon={faPlay} />
                </button>
            </div>
            <div
                className={styles.details}>
                    <div className={styles.title} onClick={handleClick}>{album.title}</div>
                    <div className={styles.artist}>{album.artist}</div>
            </div>
        </div>
    )
}

export default AlbumCard