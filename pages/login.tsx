import React from 'react'
import type { NextPage } from 'next'
import Layout from 'components/Layout'
import Login from 'components/Login/Login'
import { AuthContext } from 'components/auth/AuthContext'
import { useRouter } from 'next/router'

const LoginPage: NextPage = () => {

    const { isLoggedIn } = React.useContext(AuthContext)
    const router = useRouter()

    //if (isLoggedIn) router.push('/')

    // React.useEffect(() => {
    //     isLoggedIn
    //         ? router.push('/')
    //         : null

    // }, [isLoggedIn, router])

    return (
        <Layout>
            
           <Login />

        </Layout>
    )
}

export default LoginPage