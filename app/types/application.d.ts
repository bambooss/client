import {Status} from 'app/types/constants'
import {IAuthUser} from 'app/types/user'

export const ApplicantData: Partial<IAuthUser>

export type ApplicationType = {
  id: number
  status: keyof typeof Status
}

export interface IApplicationData {
  id: number
  user: typeof ApplicantData
  position: {id: number; title: string; projectId: number}
}
