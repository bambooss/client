import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'
import axios from 'axios'

const Home: NextPage = ({
    token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <Head>
                <title>Project Zone</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <h2>Home Page</h2>
            <p>{token}</p>
        </div>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async context => {
    const token = context.req.headers.cookie?.replace(
        'authorization=',
        'Bearer '
    )
    if (!token) {
        // If no user, redirect to login
        return {
            props: {},
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    } else {
        try {
            const response = await axios.get('user', {
                headers: {
                    Authorization: token,
                },
            })
            console.log('Back-end response: ', response.data)

            // If there is a user, return the current token
            return {props: {token}}
        } catch (error) {
            console.log('Error: ', error.message)
            if (error.message === 'Request failed with status code 401') {
                // This only gets triggered if something is wrong with the token
                // or anything with the authentication middleware
                return {
                    props: {},
                    redirect: {
                        destination: '/signin',
                        permanent: false,
                    },
                }
            } else {
                // I added this just in case there is a server error or some sort
                // I know it's the same as the other one, but maybe in the future
                // we want to handle server errors differently.
                return {
                    props: {},
                    redirect: {
                        destination: '/signin',
                        permanent: false,
                    },
                }
            }
        }
    }
}
