import React from 'react'
import styles from './userDropdown.module.scss'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
    dropdownIsOpen: boolean
    setDropdownIsOpen: (bool: boolean) => void
    logout: () => void
}

const variants = {
    initial: {
        scale: 0,
    },

    animate: {
        scale: 1,
    },
    
    exit: {
        scale: 0
    }
}

const UserDropdown: React.FC<Props> = ({ dropdownIsOpen, setDropdownIsOpen, logout}) => {

    return (
        <div 
            className={styles.dropdown}
            onClick={() => setDropdownIsOpen(false)}
            >
            <motion.div 
                className={styles.container}
                initial='initial'
                animate='animate'
                exit='exit'
                variants={variants}>
                <h1>Confirm Exit:</h1>
                <div>Are you sure you wish to log out?</div>
                <div className={styles.btnContainer}>
                    <button
                        type='button'
                        onClick={() => setDropdownIsOpen(false)}
                        >
                        Cancel
                    </button>
                    <button
                        type='button'
                        onClick={logout}
                        >
                        Yes
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default UserDropdown