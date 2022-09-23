import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import axios from 'axios'

const Home: NextPage = () => {

    const [albums, setAlbums] = React.useState([])

    React.useEffect(() => {
        (async () => {
              
            const response = await axios({
                method: 'get',
                url: 'http://192.168.1.21:4000/album?page=1&limit=10',
                withCredentials: true
            })
            setAlbums(response.data.results)
        })()
    }, [])

    return (
        <div className={styles.container}>
            <Head>
              <title>Create Next App</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <h4>Hello</h4>

            {
                albums && albums.map((album, index) => (
                    <div key={index}>{album.title}</div>
                ))
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
