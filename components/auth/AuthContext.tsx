import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'

interface AuthContextInterface {
    user: string | null
    setUser: React.Dispatch<React.SetStateAction<string | null>>
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    loginUser: (username: string, password: string) => Promise<AxiosResponse<any, any>>
    logoutUser: () => Promise<AxiosResponse<any, any>>
}

export const AuthContext = React.createContext<AuthContextInterface | null>(null)

interface Props {
    children: React.ReactNode | null
}

export const AuthProvider: React.FC<Props> = ({ children }) => {

    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)
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
        
        setIsLoggedIn(true)
        setUser(username)
        return response
    }

    const logoutUser = async() => {

        const response = await axios({
            method: 'post',
            url: 'http://192.168.1.21:4000/logout',
            withCredentials: true,
        })
    
        if (response.status !== 200) return response

        setUser(null)
        setIsLoggedIn(false)
        return response
    }

    const contextData = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        loginUser,
        logoutUser
    }

    React.useEffect(() => {
        setLoading(false)
    }, [loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? 'loading...' : children}
        </AuthContext.Provider>
    )
}


