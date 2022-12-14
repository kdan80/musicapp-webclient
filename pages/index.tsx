import type { NextPage, GetServerSideProps } from 'next'
import React from 'react'
import axios from 'axios'
import Header from 'components/Header/Header'
import Dashboard from 'components/Dashboard/Dashboard'
import styles from 'styles/Home.module.scss'
import MiniPlayer from 'components/AudioPlayer/MiniPlayer'
import AudioPlayer from 'components/AudioPlayer/AudioPlayer'
import AlbumGrid from 'components/Album/AlbumGrid'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthContext } from 'components/auth/AuthContext'
import { useRouter } from 'next/router'

const Home: NextPage = () => {

    const [albums, setAlbums] = React.useState<Album[] | null>(null)
    const [nowPlaying, setNowPlaying] = React.useState<NowPlaying | null>(null)
    const [showMiniPlayer, setShowMiniPlayer] = React.useState<boolean>(false)
    const [showAudioPlayer, setShowAudioPlayer] = React.useState<boolean>(false)
    const [audioSrc, setAudioSrc] = React.useState<string | null>(null)
    const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
    const [currentTime, setCurrentTime] = React.useState<number>(0)
    const [trackDuration, setTrackDuration] = React.useState<number>(0)
    const [skipToTimestamp, setSkipToTimestamp] = React.useState<number>(0)
    const [volume, setVolume] = React.useState<number>(100)
    const [isMuted, setIsMuted] = React.useState<boolean>(false)
    const [currentTrack, setCurrentTrack] = React.useState<number>(0)
    const audioPlayerRef = React.useRef<HTMLAudioElement | null>(null)
    const { logoutUser } = React.useContext(AuthContext)
    const router = useRouter()

    const playNextTrack = () => {
        let track = 0
        if (nowPlaying && currentTrack < nowPlaying.album.track_list.length) {
            track = currentTrack + 1
        }
        return setCurrentTrack(track)
    }

    React.useEffect(() => {
        (async () => {
           
            try {
                const response = await axios({
                    method: 'get',
                    url: `${process.env.API_ALBUM_ENDPOINT}?page=1&limit=144`,
                    withCredentials: true
                })

                setAlbums(response.data.results)

            } catch (err) {
                logoutUser()
                router.push('/')
            }

        })()
    }, [logoutUser, router])

    // Get source for current track
    React.useEffect(() => {
        if (nowPlaying) {
            const src = nowPlaying.presignedUrls[currentTrack]
            setAudioSrc(src)
        }
    }, [currentTrack, nowPlaying])

    // Disable scrolling when AudioPlayer is displayed
    React.useEffect(() => {
        showAudioPlayer
            ? document.body.classList.add('disable-scroll')
            : document.body.classList.remove('disable-scroll')
    }, [showAudioPlayer])

    React.useEffect(() => {
        if (nowPlaying) {
            setCurrentTrack(0)
            setIsPlaying(true)
        }
    }, [nowPlaying])

    // Alternate between MiniPlayer and AudioPlayer
    React.useEffect(() => {
        if (nowPlaying && !showAudioPlayer) {
            setShowMiniPlayer(true)
        }
    }, [nowPlaying, showAudioPlayer])

    React.useEffect(() => {
        if (nowPlaying && !showMiniPlayer) {
            setShowAudioPlayer(true)
        }
    }, [nowPlaying, showMiniPlayer])

    // Update current time
    React.useEffect(() => {
        if (audioPlayerRef.current) audioPlayerRef.current.currentTime = skipToTimestamp / 1000
    }, [skipToTimestamp])

    // Get current song duration
    React.useEffect(() => {
        if (nowPlaying && nowPlaying.album.track_list.length > currentTrack) {
            setTrackDuration(nowPlaying.album.track_list[currentTrack].duration * 1000)
        }
    }, [currentTrack, nowPlaying])

    // Play & pause functionality
    React.useEffect(() => {
        if (isPlaying) {
            audioPlayerRef.current?.play()
        } else {
            audioPlayerRef.current?.pause()
        }
    }, [isPlaying])

    // Volume control
    React.useEffect(() => {
        if (audioPlayerRef.current) audioPlayerRef.current.volume = volume / 100
    }, [volume])

    return (
        <div className={styles.home}>
            <Header />
            <Dashboard>
                {
                    albums && (
                        <AlbumGrid 
                            albums={albums} 
                            setNowPlaying={setNowPlaying}
                            setCurrentTrack={setCurrentTime}
                            setShowMiniPlayer={setShowMiniPlayer} />
                    )
                }
            </Dashboard>
            
            <AnimatePresence>
                {
                    showMiniPlayer && (
                        <motion.div
                            className={styles.miniPlayerWrapper}
                            key='miniPlayer'
                            initial={{ y: '100%' }}
                            animate={{ y: 0, transition: { duration: .35 } }}
                            exit={{ y: '100%', transition: { duration: .2 } }}
                            >
                            <MiniPlayer 
                                nowPlaying={nowPlaying}
                                currentTime={currentTime}
                                currentTrack={currentTrack}
                                setCurrentTrack={setCurrentTrack}
                                isPlaying={isPlaying}
                                setIsPlaying={setIsPlaying}
                                isMuted={isMuted}
                                setIsMuted={setIsMuted}
                                volume={volume}
                                setVolume={setVolume}
                                trackDuration={trackDuration}
                                setSkipToTimestamp={setSkipToTimestamp}
                                setShowMiniPlayer={setShowMiniPlayer} />
                        </motion.div>
                    )
                }
            </AnimatePresence>

            <AnimatePresence>
                {
                    showAudioPlayer && (
                        <motion.div
                            className={styles.audioPlayerWrapper}
                            key='audioPlayer'
                            initial={{ y: '100%' }}
                            animate={{ y: 0, transition: { duration: .35 } }}
                            exit={{ y: '100%', transition: { duration: .2 } }}>
                                <AudioPlayer
                                    nowPlaying={nowPlaying}
                                    currentTime={currentTime}
                                    currentTrack={currentTrack}
                                    setCurrentTrack={setCurrentTrack}
                                    isPlaying={isPlaying}
                                    setIsPlaying={setIsPlaying}
                                    isMuted={isMuted}
                                    setIsMuted={setIsMuted}
                                    volume={volume}
                                    setVolume={setVolume}
                                    trackDuration={trackDuration}
                                    setSkipToTimestamp={setSkipToTimestamp}
                                    setShowAudioPlayer={setShowAudioPlayer} />
                        </motion.div>
                    )
                }
            </AnimatePresence>

                {/* This audio player is hidden. The code above is used for the UI */}
                {
                    nowPlaying && audioSrc && (
                        <audio
                            controls={false} 
                            src={audioSrc} 
                            autoPlay={true} 
                            ref={audioPlayerRef}
                            onTimeUpdate={(e: any) => setCurrentTime(e.target.currentTime * 1000)}
                            onPlay={() => setIsPlaying(true)} 
                            onPause={() => setIsPlaying(false)}
                            onEnded={playNextTrack}  
                            muted={isMuted} />
                    )
                }
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const authCookie = context.req.cookies['user']
    const isLoggedIn = authCookie ? true : false

    if (!isLoggedIn) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return { props: {}}
}

export default Home