type Track = {
    title: string
    album: string
    artist: string
    disc_number: number
    duration: number
    featured_artists: [string]
    filename: string
    genres: [string]
    nano_id: string
    release_year: number
    track_number: number
}

type Album = {
    _id: string
    artist: string
    title: string
    duration: number
    featured_artists: [string]
    release_year: number
    comment: string
    genres: [string]
    number_of_discs: number
    album_art: string
    track_list: [Track]
    path: string
}

type NowPlaying = {
    album: Album
    presignedUrls: string[]
}