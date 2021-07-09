import Head from 'next/head'
import Link from 'next/link'

import {useForm} from 'react-hook-form'
import useUserLogin from '@hooks/user/useUserLogin'

import Container from '@components/containers/Container/Container'
import SigninForm from '@components/form/Form/Signin'

import type {ISigninInputs} from 'app/types/user'

const SignIn = (): JSX.Element => {
  const {register, handleSubmit, errors} = useForm<ISigninInputs>()
  const onSubmit = useUserLogin()
  return (
    <Container>
      <Head>
        <title>SignIn</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='h-92v container flex justify-center items-center'>
        <section className='h-2/5 w-3/6 xl:w-2/6 border border-black rounded py-4 px-10'>
          <header className='h-1/6 text-center'>
            <h1 className='text-3xl'>SignIn</h1>
          </header>
          <SigninForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
          />
          <div className='inline-flex justify-between w-full h-1/6 pt-5 lg:text-xs'>
            <Link href='/signup'>
              <a>Do not have an account? SignUp</a>
            </Link>
            <span className='text-right'>Forgot your password?</span>
          </div>
        </section>
      </div>
    </Container>
  )
}

export default SignIn
