import {PActions} from 'app/types/constants'
import type {PositionResponseType} from 'app/types/response'
import {useFetchContext} from '@hooks/fetch/useFetchContext'
import {usePositionContext} from '@hooks/position/usePositionContext'

export default function useRemoveApplication(
  id: number
): () => Promise<PositionResponseType> {
  const {dispatch} = usePositionContext()
  const fetchContext = useFetchContext()
  const handleConfirm = async (): Promise<PositionResponseType> => {
    try {
      const response =
        await fetchContext.authAxios.delete<PositionResponseType>(
          '/application/revoke',
          {data: {id}}
        )
      const {data} = response
      if (response.status === 201) {
        dispatch({type: PActions.edit, payload: response.data.position})
        return Promise.resolve(data)
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return handleConfirm
}
