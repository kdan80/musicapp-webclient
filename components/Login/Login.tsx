import React from 'react'
import styles from './login.module.scss'
import { AuthContext } from 'components/auth/AuthContext'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { hideGuestText, showGuestText, hideUserText, showUserText, buttonText } from './login.animations'

const Login = () => {

    const { loginUser } = React.useContext(AuthContext)
    const router = useRouter()

    const [isGuest, setIsGuest] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault()

        if (!username || !password) return

        try {

            const response = await loginUser(username, password)
            //if (response.status !== 200) return

            return router.push('/')

        } catch (err: any) {
            console.log('error: ', err.response.data.message)
            setErrorMessage(err.response.data.message)
        }

        
    }   

    const enableGuestSignIn = () => {
        setIsGuest(true)
        setUsername('guest')
        setPassword('@Aa34567891')
    }

    const cancelGuestSignIn = () => {
        setIsGuest(false)
        setUsername('')
        setPassword('')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'username') return setUsername(e.target.value)
        if (e.target.name === 'password') return setPassword(e.target.value)
    }

    // This is used to disable animations on first render
    const componentDidMount = React.useRef(true)
    React.useEffect(() => {
        if (componentDidMount.current) {
            componentDidMount.current = false;
            return;
        }
    });

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

                {
                    errorMessage && (
                        <motion.div
                            className={styles.errorMessage}
                        >{errorMessage}</motion.div>
                    )
                }

                <button type='submit'>
                    
                    {
                        !isGuest && (
                            <motion.div 
                                initial='initial'
                                animate='animate'
                                variants={componentDidMount.current ? undefined : buttonText}>
                                Sign in
                            </motion.div>
                        )
                    }

                    {
                        isGuest && (
                            <motion.div 
                                initial='initial'
                                animate='animate'
                                variants={componentDidMount.current ? undefined : buttonText}
                                >
                                Sign in as guest
                            </motion.div>
                        )
                    }

                </button>

            </form> 

            <div className={styles.bottomText}>  

                <motion.div 
                    className={styles.userText}
                    initial='initial'
                    animate='animate'
                    variants={
                        componentDidMount.current 
                            ? undefined
                            : isGuest
                                ? hideUserText 
                                : showUserText
                    }
                    >
                    <div>Don&apos;t have an account?</div>
                    <div>Sing in as a <span onClick={enableGuestSignIn}>guest</span></div>
                </motion.div>

                <motion.div 
                    className={styles.guestText}
                    initial='initial'
                    animate='animate'
                    variants={
                        componentDidMount.current 
                            ? undefined
                            : isGuest
                                ? showGuestText 
                                : hideGuestText
                    }
                    >
                    <div>Return to the standard <span onClick={cancelGuestSignIn}>login</span></div>
                </motion.div>

            </div>
             
        </div>
    )
}

export default Login