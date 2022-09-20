import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'components/auth/AuthContext'
import AuthGuard from 'components/auth/AuthGuard'

function MyApp({ Component, pageProps }: AppProps) {
    
    return (
        <AuthProvider>
            <AuthGuard>
                <Component {...pageProps} />
            </AuthGuard>
        </AuthProvider>
    )
}

export default MyApp
