import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'components/auth/AuthContext'
import DocumentHead from 'components/DocumentHead'

// CSS injection to scale font awesome icons correctly
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
    
    return (
        <AuthProvider>
            <DocumentHead />
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp
