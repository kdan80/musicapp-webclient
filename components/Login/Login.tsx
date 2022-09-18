import React from 'react'
import styles from './login.module.scss'
import { AuthContext } from 'components/auth/AuthContext'
import { useRouter } from 'next/router'

const Login = () => {

    const context = React.useContext(AuthContext)
    const router = useRouter()

    const [username, setUsername] = React.useState<string | null>(null)
    const [password, setPassword] = React.useState<string | null>(null)

    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!username || !password || !context) return

        const { loginUser } = context

        const response = await loginUser(username, password)
        if (response.status !== 200) return

        return router.push('/')
    }   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'username') return setUsername(e.target.value)
        if (e.target.name === 'password') return setPassword(e.target.value)
    }

    return (
        <div className={styles.login}>
            <h1>Sign In</h1>
            <form action='' onSubmit={handleSubmit}>
                <input name='username' type='text' placeholder='Username' required onChange={handleChange} />
                <input name='password' type='password' placeholder='Password' required onChange={handleChange} />
                <button type='submit'>Sign In</button>
            </form> 
        </div>
    )
}

export default Login