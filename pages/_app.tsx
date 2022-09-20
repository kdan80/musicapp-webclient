import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'components/auth/AuthContext'
import AuthGuard from 'components/auth/AuthGuard'

function MyApp({ Component, pageProps }: AppProps) {
    
    return (
        <AuthProvider>

            {/* {Component.requireAuth ? (
                <AuthGuard>
                    <Component {...pageProps} />
                </AuthGuard>
            ) : (
            // public page
                <Component {...pageProps} />
            )} */}
            <Component {...pageProps}/>

        </AuthProvider>
    )
}

export default MyApp
