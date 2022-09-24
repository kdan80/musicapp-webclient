import React from 'react'
import styles from './login.module.scss'
import { AuthContext } from 'components/auth/AuthContext'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

const variants = {
    initial: {
        opacity: 0,
        x: -100,
      },
      enter: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            bounce: .35,
            duration: .75,
        }
      },
      exit: {
        opacity: 0,
        x: -100,
      }
}

const guestVariants = {
    initial: {
        opacity: 0,
        x: 100,
    },
    enter: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            bounce: .35,
            duration: .75,
        }
    },
    exit: {
        opacity: 0,
        x: 100,
      }
}

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

    const firstRender = React.useRef(true);

    React.useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
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

                <button type='submit'>
                    <motion.div
                        initial={{ opacity: 0}}
                        animate={{ 
                            opacity: 1,
                            scaleX: [1,1.01,1]
                        }}>
                            {buttonText}
                    </motion.div>
                </button>

            </form> 

            <div className={styles.bottomText}>             
                
                {
                    !isGuest && (
                        <motion.div
                            initial={firstRender.current ? undefined : 'initial'}
                            animate='enter'
                            //exit={undefined}
                            variants={variants}
                            >
                            <div>Don't have an account?</div>
                            <div>Sign in as a <a href='#' onClick={enableGuestSignIn}>guest</a></div>
                        </motion.div>
                    )
                }
                

                {
                    isGuest && (
                        <motion.div
                            initial='initial'
                            animate='enter'
                            //exit='exit'
                            variants={guestVariants}
                            >
                            Go back to the standard <a href='#' onClick={cancelGuestSignIn}>login</a>
                        </motion.div>
                    )
                }
             
            </div>
            
             
        </div>
    )
}

export default Login