import React from 'react'
import styles from './login.module.scss'
import { AuthContext } from 'components/auth/AuthContext'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { userText, guestText, submitButton } from './login.animations'

const Login = () => {

    const { loginUser } = React.useContext(AuthContext)
    const router = useRouter()

    const [isGuest, setIsGuest] = React.useState<boolean>(false)
    const [buttonText, setButtonText] = React.useState<string>('Sign in')
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault()

        if (!username || !password) return

        const response = await loginUser(username, password)
        console.log('login')
        if (response.status !== 200) return

        return router.push('/')
    }   

    const enableGuestSignIn = () => {
        setIsGuest(true)
        setUsername('guest')
        setPassword('@Aa34567891')
        setButtonText('Sign in as guest')
    }

    const cancelGuestSignIn = () => {
        setIsGuest(false)
        setUsername('')
        setPassword('')
        setButtonText('Sign in')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'username') return setUsername(e.target.value)
        if (e.target.name === 'password') return setPassword(e.target.value)
    }

    return (
        <div className={styles.login}>

            <h1>Sign In</h1>

            <form action='' onSubmit={handleSubmit}>

                <input 
                    value={username} 
                    autoComplete={username} 
                    name='username' 
                    type='text' 
                    placeholder='Username' 
                    disabled={isGuest}
                    onChange={handleChange}
                    required 
                />

                <input 
                    value={password} 
                    autoComplete={password}  
                    name='password' 
                    type='password' 
                    placeholder='Password' 
                    disabled={isGuest}
                    onChange={handleChange}
                    required 
                />

                <button type='submit'>

                    <motion.div
                        className={styles.userText}
                        initial='initial'
                        animate={isGuest ? undefined : 'enter'}
                        exit={isGuest ? 'exit' : undefined}
                        variants={submitButton}>
                            {buttonText}
                    </motion.div>
                        
                    <motion.div
                        className={styles.guestText}
                        initial='initial'
                        animate={!isGuest ? undefined : 'enter'}
                        exit={!isGuest ? 'exit' : undefined}
                        variants={submitButton}>
                            {buttonText}
                    </motion.div>

                </button>

            </form> 

            <div className={styles.bottomText}>    

                    <motion.div
                        className={styles.userText}
                        initial='initial'
                        animate={isGuest ? undefined : 'enter'}
                        exit={isGuest ? 'exit' : undefined}
                        transition={{ 
                            type: 'spring',
                            bounce: .3,
                            duration: .5,
                        }}
                        variants={userText}>
                        <div>Don't have an account?</div>
                        <div>Sign in as a <a href='#' onClick={enableGuestSignIn}>guest</a></div>
                    </motion.div>
                     
                    <motion.div
                        className={styles.guestText}
                        initial='initial'
                        animate={!isGuest ? undefined : 'enter'}
                        exit={!isGuest ? 'exit' : undefined}
                        transition={{ 
                            type: 'spring',
                            bounce: .3,
                            duration: .5,
                        }}
                        variants={guestText}>
                        Go back to the standard <a href='#' onClick={cancelGuestSignIn}>login</a>
                    </motion.div>

            </div>
             
        </div>
    )
}

export default Login