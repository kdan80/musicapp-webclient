import React, { Dispatch, SetStateAction} from 'react'

interface Props {
    album: any
}

const DummyPlayer: React.FC<Props> = ({ album }) => {

    const { title, artist, track_list } = album
    track_list.sort((a: any, b: any) => a.track_number - b.track_number)
    const [isPlaying, setIsPlaying] = React.useState<boolean>(true)
    const [currentTime, setCurrentTime] = React.useState<number>(0)
    const [trackDuration, setTrackDuration] = React.useState<number>(0)
    const [skipToTimestamp, setSkipToTimestamp] = React.useState<number>(0)
    const [volume, setVolume] = React.useState<number>(100)
    const [isMuted, setIsMuted] = React.useState<boolean>(false)
    const [currentTrack, setCurrentTrack] = React.useState<number>(0)
    const audioPlayerRef = React.useRef<HTMLAudioElement | null>(null)

    const getAudioSrc = (trackNumber: number) => {
        return `http://192.168.1.26:9000/media/${artist}/${title}/${track_list[trackNumber].filename}` 
    }
    const [audioSrc, setAudioSrc] = React.useState<string>(getAudioSrc(0))

    const getNextTrack = () => {
        let track = 0
        if (currentTrack < track_list.length) {
            track = currentTrack + 1
        }
        const src = getAudioSrc(track)
        setCurrentTrack(track)
        setAudioSrc(src)
        return
    }

    // Update current time
    React.useEffect(() => {
        if ( audioPlayerRef.current ) audioPlayerRef.current.currentTime = skipToTimestamp / 1000
    }, [skipToTimestamp])

    // Reset current track when a new album is loaded
    React.useEffect(() => {
        setCurrentTrack(0)
    }, [album])

    // Get current song duration
    React.useEffect(() => {
        setTrackDuration(track_list[currentTrack].duration * 1000)
    }, [currentTrack, track_list])

    // Play & pause functionality
    React.useEffect(() => {
        if (isPlaying) {
            audioPlayerRef.current?.play()
        } else {
            audioPlayerRef.current?.pause()
        }
    }, [isPlaying])

    // Skip track functionality
    React.useEffect(() => {
        const src = getAudioSrc(currentTrack)
        setAudioSrc(src)
    }, [currentTrack, getAudioSrc])

    // Volume control
    React.useEffect(() => {
        if (audioPlayerRef.current) audioPlayerRef.current.volume = volume / 100
    }, [volume])

    return (
        <audio
            controls={false} 
            src={audioSrc} 
            autoPlay={true} 
            ref={audioPlayerRef}
            onTimeUpdate={(e: any) => setCurrentTime(e.target.currentTime * 1000)}
            onPlay={() => setIsPlaying(true)} 
            onPause={() => setIsPlaying(false)}
            onEnded={getNextTrack}  
            muted={isMuted}>
            
        </audio>
    )
}

export default DummyPlayer