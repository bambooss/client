import {NextPage} from 'next'
import Head from 'next/head'

interface Props {
    user: `Record<string, never>`
}

const Home: NextPage<Props> = () => {
    function handleClick(): void {
        window.open(
            'https://github.com/login/oauth/authorize?client_id=95f729efef07a38ddd92'
        )
    }
    return (
        <div>
            <Head>
                <title>Project Zone</title>
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
