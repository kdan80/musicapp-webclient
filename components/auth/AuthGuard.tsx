// AuthGuard.tsx
import { AuthContext } from './AuthContext'
import React from 'react'
import { useRouter } from 'next/router'

interface Props {
    children: React.ReactNode
}

const AuthGuard: React.FC<Props> = ({ children }) => {

    const { isLoggedIn, isLoading } = React.useContext(AuthContext)

    const router = useRouter()

    React.useEffect(() => {
        if (!isLoading) {
            
            if (!isLoggedIn) {
                router.push('/login')
            }
        }

        if (isLoggedIn && router.pathname === '/login') {
            router.push('/')
        }
    }, [isLoading, router, isLoggedIn])

   
    if (isLoading) {
        return <h1>Application Loading</h1>
    }

    if (isLoggedIn && router.pathname === '/login')
        return <h1>Application Loading</h1>
    
    if (!isLoading && isLoggedIn) {
        return <>{children}</>
    }

    return null
}

export default AuthGuard