// AuthGuard.tsx
import { AuthContext } from './AuthContext'
import React from 'react'
import { useRouter } from 'next/router'

interface Props {
    children: React.ReactNode
}

const AuthGuard: React.FC<Props> = ({ children }) => {

    const { isLoggedIn, isLoading } = React.useContext(AuthContext)

    //const { user, initializing, setRedirect } = useAuth()
    const router = useRouter()

    React.useEffect(() => {
        if (!isLoading) {
            //auth is initialized and there is no user
            if (!isLoggedIn) {
                // remember the page that user tried to access
                //setRedirect(router.route)
                // redirect
                router.push('/login')
            }
        }
    }, [isLoading, router, isLoggedIn])

    /* show loading indicator while the auth provider is still isLoading */
    if (isLoading) {
        return <h1>Application Loading</h1>
    }

    // if auth initialized with a valid user show protected page
    if (!isLoading && isLoggedIn) {
        return <>{children}</>
    }

    /* otherwise don't return anything, will do a redirect from useEffect */
    return null
}

export default AuthGuard