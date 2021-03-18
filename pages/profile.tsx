import {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import {ParsedUrlQuery} from 'querystring'
import {parseCookies} from '../app/utils/parseCookies'

import {useAuthState} from '../app/contexts/auth'

import axios from 'axios'

import Navbar from '../app/components/Navbar'

import {IProject} from '../app/types/project'

const Profile: NextPage = ({
    projects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const {user} = useAuthState()
    const {
        avatar,
        username,
        email,
        bio,
        languages,
        technologies,
        bitbucketURL,
        githubURL,
        gitlabURL,
        linkedinURL,
    } = {...user}
    return (
        <div className='min-h-screen md:container'>
            <Head>
                <title>Profile</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar />
            <main className='h-92v py-20 px-36'>
                <div className='h-full grid grid-cols-3 divide-x divide-black-500'>
                    <section className='h-4/5 p-4'>
                        <div className='h-3/6'>
                            <img
                                className='w-80 rounded-full'
                                src={avatar}
                                alt='profile'
                            />
                        </div>
                        <div className='relative h-1/6'>
                            <button
                                value='Edit Profile'
                                className='absolute inset-x-0 bottom-0 h-2/6 w-3/5 text-white rounded bg-green-700 mb-2'
                            >
                                Edit Profile
                            </button>
                        </div>
                        <div className='h-2/6 flex flex-col justify-around'>
                            <span>{username}</span>
                            <span>{email}</span>
                            <p>{bio}</p>
                            <div>
                                {languages?.map((language, index) => {
                                    {
                                        return index ===
                                            languages.length - 1 ? (
                                            <span key={language}>
                                                {language}
                                            </span>
                                        ) : (
                                            <span
                                                key={language}
                                            >{`${language}, `}</span>
                                        )
                                    }
                                })}
                            </div>
                            <div>
                                {technologies?.map((technology, index) => {
                                    {
                                        return index ===
                                            technologies.length - 1 ? (
                                            <span key={technology}>
                                                {technology}
                                            </span>
                                        ) : (
                                            <span
                                                key={technology}
                                            >{`${technology}, `}</span>
                                        )
                                    }
                                })}
                            </div>
                            <span>{bitbucketURL}</span>
                            <span>{githubURL}</span>
                            <span>{gitlabURL}</span>
                            <span>{linkedinURL}</span>
                        </div>
                    </section>
                    <article className='w-200 h-full border-2 border-solid rounded'>
                        <header className='w-max h-12 m-auto text-4xl mb-2'>
                            <h1>Activities</h1>
                        </header>
                        <main className='w-full h-auto p-1'>
                            <section>
                                <h2 className='text-2xl mb-1'>Projects</h2>
                                <div className='grid grid-flow-row grid-cols-2 grid-rows-2 gap-2'>
                                    {projects
                                        .filter(
                                            (_: IProject, index: number) =>
                                                index < 4
                                        )
                                        .map((project: IProject) => {
                                            const {_id, name} = project
                                            return (
                                                <div
                                                    key={_id}
                                                    className='h-40 p-1 border-gray-400 border-2 rounded'
                                                >
                                                    <h3>
                                                        {name.toUpperCase()}
                                                    </h3>
                                                </div>
                                            )
                                        })}
                                </div>
                            </section>
                        </main>
                    </article>
                </div>
            </main>
        </div>
    )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
    //* Get the user's session based on the request
    const {session: token} = parseCookies(context.req)

    if (!token) {
        //* If no user, redirect to login
        return {
            props: {},
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    }

    const {
        data: {projects},
    } = await axios.get('/project/user', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    //* If there is a user, return the current session
    return {
        props: {
            projects,
        },
    }
}
