import React from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import Layout from 'components/Layout'
import Login from 'components/Login/Login'

const LoginPage: NextPage = () => {
    
    return (
        <Layout>
            <Login />
        </Layout>
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