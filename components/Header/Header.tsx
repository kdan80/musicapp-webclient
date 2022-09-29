import React from 'react'
import styles from './header.module.scss'
import { AuthContext } from 'components/auth/AuthContext'
import { useRouter } from 'next/router'
import OptionsList from './OptionsList'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LogoutModal from './LogoutModal'

const Header = () => {

    const { logoutUser, user } = React.useContext(AuthContext)
    const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
    const router = useRouter()

    const logout = async() => {
        setModalIsOpen(false)
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
                    className={styles.userBtn}
                    title={user || undefined}
                    onClick={() => setModalIsOpen(true)}
                    type='button'
                    >
                        <div
                            className={styles.icon}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className={styles.username}>
                            {user}
                        </div>
                </button>
            </div>
            <div className={styles.bottomRow}>
                <OptionsList />
            </div>
            
                    <LogoutModal 
                        modalIsOpen={modalIsOpen} 
                        setModalIsOpen={setModalIsOpen} 
                        logout={logout} 
                    />
            
        </div>
    )
}

export default Header