import type {IProjectData} from 'app/types/project'

const ProjectItem = ({
  name,
  jobsAvailable,
  description,
  technologies,
  collaborators,
}: IProjectData): JSX.Element => {
  return (
    <li className='h-40 p-1 mx-2 border-gray-300 border-2 rounded'>
      <header className='h-1/5 font-extrabold'>
        <h3>{name}</h3>
      </header>
      <article className='h-2/5 text-sm'>
        <p>{description}</p>
      </article>
      <article className='h-1/5'>
        <span>{technologies.toString()}</span>
      </article>
      <article className='h-1/5 flex flex-row justify-start'>
        {jobsAvailable ? (
          <div className='h-3 w-3 bg-green-800 rounded-full' />
        ) : (
          <div className='h-3 w-3 bg-red-600 rounded-full' />
        )}
        <span>{collaborators}</span>
      </article>
    </li>
  )
}

export default ProjectItem
