import React from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import styles from 'styles/Login.module.scss'
import Login from 'components/Login/Login'

const LoginPage: NextPage = () => {
    
    return (
        <div className={styles.login}>
            <div className={styles.background} />
            <Login />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const authCookie = context.req.cookies['user']
    const isLoggedIn = authCookie ? true : false

    if (isLoggedIn) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return { props: {}}
}

export default LoginPage