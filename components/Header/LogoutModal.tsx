import React from 'react'
import styles from './LogoutModal.module.scss'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
    modalIsOpen: boolean
    setModalIsOpen: (bool: boolean) => void
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
        scale: 0,
        transition: {
            duration: .15
        }
    }
}

const LogoutModal: React.FC<Props> = ({ modalIsOpen, setModalIsOpen, logout}) => {

    const modalRef = React.useRef<HTMLDivElement | null>(null)

    // As this is being added to a document and not a react node the type should be MouseEvent not React.MouseEvenet
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
              setModalIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [setModalIsOpen])

    return (
        
        <AnimatePresence>
           {
                modalIsOpen && (
                    <motion.div 
                        ref={modalRef}
                        className={styles.modal}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        variants={variants}>
                        <h1>Confirm Exit:</h1>
                        <div>Are you sure you wish to log out?</div>
                        <div className={styles.btnContainer}>
                            <button
                                type='button'
                                onClick={() => setModalIsOpen(false)}
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
                )
           }
        </AnimatePresence>
        
    )
}

export default LogoutModal