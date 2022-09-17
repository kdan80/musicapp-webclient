import React from 'react'
import styles from './login.module.scss'
import axios from 'axios'

const Login = () => {

    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!username || !password) return

        const res = await axios({
            method: 'post',
            url: 'http://192.168.1.21:4000/login',
            withCredentials: true,
            data: {
                "username": username,
                "password": password
            }
        })

        console.log('response: ', res)
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