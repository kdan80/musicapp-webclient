import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'

interface AuthContextInterface {
    user: string | null
    setUser: React.Dispatch<React.SetStateAction<string | null>> | null
    sessionCookie: string | null
    setSessionCookie: React.Dispatch<React.SetStateAction<string | null>> | null
    loginUser?: (username: string, password: string) => Promise<AxiosResponse<any, any>> | null
    logoutUser: () => Promise<boolean | undefined> | null
}

export const AuthContext = React.createContext<AuthContextInterface | null>(null)

interface Props {
    children: React.ReactNode | null
}

export const AuthProvider: React.FC<Props> = ({ children }) => {

    const router = useRouter()
    const [sessionCookie, setSessionCookie] = React.useState<string | null>(null)
    const [user, setUser] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true)

    const loginUser = async(username: string, password: string) => {

        const response = await axios({
            method: 'post',
            url: 'http://192.168.1.21:4000/login',
            withCredentials: true,
            data: {
                "username": username,
                "password": password
            }
        })

        if (response.status !== 200) return response
        
        console.log('logged in: ', response)
        setSessionCookie(response.data)
        setUser(username)
        return response
    }

    const logoutUser = () => {
        setSessionCookie(null)
        setUser(null)
        return router.push('/login')
    }

    const contextData = {
        user,
        setUser,
        sessionCookie,
        setSessionCookie,
        loginUser,
        logoutUser
    }

    React.useEffect(() => {
        setLoading(false)
    }, [sessionCookie, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? 'loading...' : children}
        </AuthContext.Provider>
    )
}


