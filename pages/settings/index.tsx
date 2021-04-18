import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'

import {ParsedUrlQuery} from 'querystring'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import {useForm} from 'react-hook-form'

import {edit} from '@actions/authActions'

import {parseCookies} from '@utils/parseCookies'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {useAuthState} from '@hooks/auth/useAuthState'

import Navbar from '@components/Navbar/Navbar'
import Input from '@components/Form/Input'
import FormSelect from '@components/Form/Select'
import ErrorMessage from '@components/Message/Error'
import ProfileMenu from '@components/Menu/List'
import {ConfirmButton} from '@components/Button/Confirm'
import {Biography} from '@components/Form/Biography'

import type {IUserContext} from 'app/types/user'
import type {SelectOptions} from 'app/types/form'

const Profile: NextPage = ({
  token,
  techOptions,
  langOptions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {user} = useAuthState()
  const {
    avatar,
    bio,
    bitbucketURL,
    githubURL,
    gitlabURL,
    linkedinURL,
    technologies,
    languages,
  } = {
    ...user,
  }
  const {
    handleSubmit,
    register,
    errors,
    control,
    setValue,
  } = useForm<IUserContext>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })
  const router = useRouter()
  const dispatch = useAuthDispatch()
  const [, setCookie] = useCookies(['session'])
  const onSubmit = async (data: IUserContext): Promise<any> => {
    try {
      const response = await axios.patch(
        '/user',
        {user: data},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      edit(dispatch, response.data.user)
      setCookie('session', response.data.token, {
        path: '/',
        // ? expiration date
        //maxAge: 3600, // Expires after 1hr
        sameSite: true,
        //httpOnly: true,
        //secure: true,
      })
      router.push('/profile')
      return
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Settings</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main className='h-screen pt-20 container'>
        <section className='h-full p-12'>
          <div className='h-full grid grid-cols-3 divide-x divide-black-500'>
            <ProfileMenu />
            <section className='w-200 h-auto border-2 border-solid rounded'>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col h-full justify-between p-1'
              >
                <article className='h-3/5 flex flex-col justify-evenly mb-8'>
                  <div className='flex flex-row'>
                    <div className='w-3/5'>
                      <div className='flex flex-col xl:justify-between'>
                        <Input
                          type='text'
                          id='githubURL'
                          name='githubURL'
                          label='GitHub'
                          placeholder='your GitHub username here'
                          register={register}
                          defaultValue={githubURL?.slice(19, githubURL.length)}
                        />
                        <Input
                          type='text'
                          id='gitlabURL'
                          name='gitlabURL'
                          label='GitLab'
                          placeholder='your GitLab username here'
                          register={register}
                          defaultValue={gitlabURL?.slice(19, gitlabURL.length)}
                        />
                        <Input
                          type='text'
                          id='bitbucketURL'
                          name='bitbucketURL'
                          label='BitBucket'
                          placeholder='your BitBucket username here'
                          register={register}
                          defaultValue={bitbucketURL?.slice(
                            22,
                            bitbucketURL.length - 1
                          )}
                        />
                        <Input
                          type='text'
                          id='linkedinURL'
                          name='linkedinURL'
                          label='LinkedIn'
                          placeholder='your LinkedIn username here'
                          register={register}
                          defaultValue={linkedinURL?.slice(
                            28,
                            linkedinURL.length - 1
                          )}
                        />
                      </div>
                    </div>
                    <div className='w-2/5'>
                      <div className='h-3/4 lg:mt-8'>
                        <img
                          className='h-full rounded-full ml-auto'
                          src={avatar}
                          alt='profile'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col p-0.5'>
                    <FormSelect
                      id='languages'
                      label='Languages'
                      options={langOptions}
                      placeholder='Select your languages'
                      message='Please select at least one language'
                      control={control}
                      defaultValue={languages}
                      defaultValues={languages}
                      onChange={values => {
                        setValue(
                          'languages',
                          values.map((value: SelectOptions) => value.label),
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                          }
                        )
                      }}
                      errors={
                        errors.languages && (
                          <ErrorMessage>
                            {errors.languages.message}
                          </ErrorMessage>
                        )
                      }
                    />
                  </div>
                  <div className='flex flex-col p-0.5'>
                    <FormSelect
                      id='technologies'
                      label='Technologies'
                      options={techOptions}
                      placeholder='Choose your tech stack'
                      message='Please select at least one technology'
                      control={control}
                      defaultValue={technologies}
                      defaultValues={technologies}
                      onChange={values => {
                        setValue(
                          'technologies',
                          values.map((value: SelectOptions) => value.label),
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                          }
                        )
                      }}
                      errors={
                        errors.technologies && (
                          <ErrorMessage>
                            {errors.technologies.message}
                          </ErrorMessage>
                        )
                      }
                    />
                  </div>
                </article>
                <Biography register={register} defaultValue={bio} />
                <aside className='h-1/5 flex flex-row items-end justify-start pb-2'>
                  <button
                    type='button'
                    className='w-2/6 h-6 cursor-pointer bg-gray-600 text-white rounded m-1'
                    onClick={() => router.push('/')}
                  >
                    Cancel
                  </button>
                  <ConfirmButton
                    errors={Boolean(errors.languages || errors.technologies)}
                  />
                </aside>
              </form>
            </section>
          </div>
        </section>
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

  //* If no user, redirect to login
  if (!token) {
    return {
      props: {},
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  //* If there is a user,
  const {
    data: {technologies: techOptions},
  } = await axios.get('/technology', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const {
    data: {languages: langOptions},
  } = await axios.get('/language', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  //* return user technologies
  return {
    props: {
      token,
      techOptions,
      langOptions,
    },
  }
}
