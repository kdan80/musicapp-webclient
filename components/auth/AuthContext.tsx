import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

interface AuthContextInterface {
    user: string | null
    setUser?: React.Dispatch<React.SetStateAction<string | null>>
    isLoggedIn: boolean
    setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>
    loginUser?: (username: string, password: string) => Promise<AxiosResponse<any, any>>
    isLoading: boolean
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
    logoutUser?: () => Promise<AxiosResponse<any, any>>
}

export const AuthContext = React.createContext<AuthContextInterface>({
    user: null,
    isLoggedIn: false,
    isLoading: true
})

interface Props {
    children: React.ReactNode | null
}

export const AuthProvider: React.FC<Props> = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)
    const [user, setUser] = React.useState<string | null>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const cookies = parseCookies()

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

        setCookie(null, 'user', `${username}`, {
            httpOnly: false,
            path: '/'
        })
        
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

        destroyCookie(null, 'user')

        setUser(null)
        setIsLoggedIn(false)
        return response
    }

    const contextData = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        loginUser,
        logoutUser
    }

    React.useEffect(() => {
        if (cookies.user) setIsLoggedIn(true)
        setIsLoading(false)
    }, [isLoading, isLoggedIn, cookies])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}


