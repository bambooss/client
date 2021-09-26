import {BsArrow90DegDown} from 'react-icons/bs'
import CreateProjectForm from '@components/Form/project/helpers/Create'
import {FocusTrapRefContext} from '@context/refContext'
import {FocusTrapRefProvider} from '@providers/RefProvider'
import {GetServerSideProps} from 'next'
import Head from 'next/head'
import checkAuth from '@utils/auth'

const Project = (): JSX.Element => {
  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>New</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FocusTrapRefProvider>
        <main className='h-92v flex justify-center items-center'>
          <article className='w-3/5 xl:w-1/2 h-4/5 p-4 xl:px-12 rounded border-black border-2 shadow-2xl'>
            <header className='h-1/6'>
              <FocusTrapRefContext.Consumer>
                {ref => (
                  <button ref={ref} className='relative inset-x-128	'>
                    <BsArrow90DegDown />
                  </button>
                )}
              </FocusTrapRefContext.Consumer>
              <h1 className='h-2/3 text-3xl'>Create a new project</h1>
              <span>
                Please fill out this form to start creating a new project
              </span>
            </header>
            <CreateProjectForm />
          </article>
        </main>
      </FocusTrapRefProvider>
    </section>
  )
}

export default Project

export const getServerSideProps: GetServerSideProps = async context => {
  await checkAuth(context)
  return {props: {}}
}
