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
    priority: boolean
}

const AlbumCard: React.FC<Props> = ({album, setNowPlaying, setCurrentTrack, setShowMiniPlayer, priority}) => {

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

    // const sizes = `
    //     (max-width: 500px) calc((1/2 * 100vw) - (1.5rem * 1/2)),
    //     (min-width: 500px) calc((1/3 * 100vw) - (1.5rem * 2/3)),
    //     (min-width: 700px) calc((1/4 * 100vw) - (1.5rem * 3/4)),
    //     (min-width: 800px) calc((1/5 * 100vw) - (1.5rem * 4/5)),
    //     (min-width: 1200px) calc((1/6 * 100vw) - (1.5rem * 5/6)),
    //     (min-width: 1400px) calc((1/7 * 100vw) - (1.5rem * 6/7)),
    //     (min-width: 1600px) calc((1/8 * 100vw) - (1.5rem * 7/8)),
    //     (min-width: 1920px) calc((1/9 * 100vw) - (1.5rem * 8/9)),
    //     100vw
    // `

    return (
        <div
            className={styles.card}
            >
            <div
                className={styles.art}> 
                <Image 
                    layout='responsive'
                    height={1}
                    width={1}
                    //src={`https://d30if2vv974pn3.cloudfront.net/${album._id}.webP`}
                    src={`/albumArt/${album._id}/500x500.webp`}
                    alt='album art'
                    placeholder='blur'
                    blurDataURL={`/albumArt/${album._id}/blurData.webp`}
                    //sizes={sizes}
                    //priority={priority}
                     />
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