import React from 'react'
import styles from './header.module.scss'
import { AuthContext } from 'components/auth/AuthContext'
import { useRouter } from 'next/router'
import OptionsList from './OptionsList'

const Header = () => {

    const { logoutUser } = React.useContext(AuthContext)
    const router = useRouter()

    const logout = async() => {
        const response = await logoutUser()
        console.log('logged out')
        return router.push('/login')
    }
    
    return (
        <div className={styles.header}>
            <div className={styles.topRow}>
                <div>Logo</div>
                <div className={styles.topOptions}>
                    <OptionsList />
                </div>
                <button 
                    className={styles.logoutBtn}
                    type='button'
                    onClick={logout}>
                        Logout
                </button>
            </div>
            <div className={styles.bottomRow}>
                <OptionsList />
            </div>
        </div>
    )
}

export default Header