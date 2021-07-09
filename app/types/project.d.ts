import {useProjectProvider} from '@hooks/project/useProjectProvider'
import {NestedValue} from 'react-hook-form'
import {IUserContext} from 'app/types/user'
import {SelectOptionsType} from 'app/types/form'

// https://github.com/react-hook-form/react-hook-form/issues/987
export type NestedStringsType = NestedValue<string[]>

export interface IProjectInput {
  name: string
  description: string
  mission: string
  technologies: NestedStringsType
  projectURL?: string
}

export interface IProjectData {
  id: string
  name: string
  description: string
  mission: string
  technologies: SelectOptionsType[]
  projectURL?: string
  owner: number
  collaborators: Array<IUserContext>
  hasPositions: boolean
  createdAt: string
  updatedAt: string
}
export type ProjectActionsType =
  | {type: 'add'; payload: IProjectData}
  | {type: 'remove'; payload: string}
  | {type: 'edit'; payload: IProjectData}
  | {type: 'persist'; payload: IProjectData[]}
  | {type: 'clear'}

export type ProjectStateType = Array<IProjectData>

export type ProjectContextType = {
  projects: ProjectStateType
  add: (data: IProjectData) => void
  remove: (id: string) => void
  edit: (data: IProjectData) => void
  persist: (data: IProjectData[]) => void
  clear: () => void
}

export type UseProjectContextResults = ReturnType<typeof useProjectProvider>

export type EditProjectType = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<typeof showModal>>
  project: IProjectData
}

export type RemoveProjectType = {
  uid: string
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<typeof showDialog>>
}

export type DefaultValuesType = {
  name: string
  description: string
  mission: string
  technologies: SelectOptionsType[]
  projectURL: string | undefined
}
