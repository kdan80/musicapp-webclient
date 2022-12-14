import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

interface AuthContextInterface {
    user: string | null
    setUser: React.Dispatch<React.SetStateAction<string | null>>
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    loginUser: (username: string, password: string) => void
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    logoutUser: () => void
}

// Context must only be accessed within AuthContext.Provider
export const AuthContext = React.createContext<AuthContextInterface>({} as AuthContextInterface)

interface Props {
    children: React.ReactNode | null
}

export const AuthProvider: React.FC<Props> = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)
    const [user, setUser] = React.useState<string | null>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const cookies = parseCookies()

    const loginUser = async(username: string, password: string) => {

        try {

            const response = await axios({
                method: 'post',
                url: `${process.env.API_LOGIN_ENDPOINT}`,
                withCredentials: true,
                data: {
                    "username": username,
                    "password": password
                }
            })

            if (response.status !== 200) throw new Error('Login failed')

            setCookie(null, 'user', `${username}`, {
                httpOnly: false,
                sameSite: 'lax',
                path: '/'
            })
            
            setIsLoggedIn(true)
            setUser(username)
            return

        } catch (err) {
            console.log(err)
        }
    }

    const logoutUser = async() => {

        try {
            const response = await axios({
                method: 'post',
                url: `${process.env.API_LOGOUT_ENDPOINT}`,
                withCredentials: true,
            })
            if (response.status !== 200) throw new Error()

            destroyCookie(null, 'user')
            setUser(null)
            setIsLoggedIn(false)
            return 
        } catch (err) {
            destroyCookie(null, 'user')
            setUser(null)
            setIsLoggedIn(false)
            return
        }
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
        if (cookies.user) {
            setIsLoggedIn(true)
            setUser(cookies.user)
        }
        setIsLoading(false)
    }, [isLoading, isLoggedIn, cookies])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}