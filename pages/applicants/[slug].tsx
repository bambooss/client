import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {handleAxiosError, handleUnexpectedError} from '@utils/errors'

import {ApplicantData} from 'app/types/application'
import {ApplicantsResponseType} from 'app/types/response'
import Head from 'next/head'
import {Params} from 'next/dist/server/router'
import axios from 'axios'
import {privateFetch} from '@utils/fetch'

type Props = {
  applicants: typeof ApplicantData[]
}

const Applicants: NextPage<Props> = ({
  applicants,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(applicants)
  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>Applicants</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v'>
        <section className='h-full py-12 xl:py-32 px-40 xl:px-80'></section>
      </main>
    </section>
  )
}

export default Applicants

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  try {
    const {slug} = context.params as Params
    console.log(slug)
    const {
      data: {applicants},
    } = await privateFetch(context).get<ApplicantsResponseType>(
      `/application/${slug}`
    )
    return {props: {applicants}}
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error)
      if (error?.response?.status === 401) {
        console.log('Redirect')
        return {
          redirect: {
            destination: '/signin',
            permanent: false,
          },
        }
      }
    } else {
      handleUnexpectedError(error)
    }
    return Promise.reject(error.toJSON())
  }
}
