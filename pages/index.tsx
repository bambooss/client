import {useEffect} from 'react'
import {NextPage} from 'next'
import Head from 'next/head'
import {getGitHubUser} from './api/fetch'

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID || ''
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Home: NextPage<Props> = () => {
    useEffect(() => {
        ;(async () => {
            // After requesting Github access, Github redirects back to your app with a code parameter
            const url = window.location.href
            const hasCode = url.includes('?code=')

            // If Github API returns the code parameter
            if (hasCode) {
                const newUrl = url.split('?code=')
                window.history.pushState({}, '', newUrl[0])

                const code = newUrl[1]
                const gitHubUser = await getGitHubUser(code)
                console.log(gitHubUser)
            }
        })()
    }, [])

    function handleClick(): void {
        window.open(
            `https://github.com/login/oauth/authorize?client_id=${client_id}`
        )
    }
    return (
        <div>
            <Head>
                <title>Login Page</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <header>
                <button type='button' onClick={handleClick}>
                    <span> Log in with Github </span>
                    <img
                        alt='GitHub icon'
                        src='https://img.icons8.com/ios-filled/2x/github.png'
                        style={{height: '20px', width: '20px'}}
                    />
                </button>
            </header>

            <footer></footer>
        </div>
    )
}

export default Home
