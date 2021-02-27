import type {AppProps} from 'next/app'
import React from 'react'
import axios from 'axios'

// This helps you that you don't have to define localhost in every single axios url
// and also when we deploy our app, we only have to change the URL in one place if necessary.
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

import {AuthProvider} from '../app/contexts/auth'

function MyApp({Component, pageProps}: AppProps): React.ReactNode {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp
