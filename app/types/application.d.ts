import {Status} from 'app/types/constants'
import {IAuthUser} from 'app/types/user'

export const ApplicantData: Partial<IAuthUser>

export interface IApplicationData {
  id: number
  status: keyof typeof Status
  user: typeof ApplicantData
  position: {id: number; title: string; projectId: number}
}
