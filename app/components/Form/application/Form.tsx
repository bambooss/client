import * as React from 'react'

import useSessionCookie from '@hooks/cookie/useSessionCookie'
import useAddApplication from '@hooks/application/useAddApplication'
import useModalContext from '@hooks/modal/useModalContext'

import CancelButton from '@components/form/Button/Cancel'
import {ConfirmButton} from '@components/form/Button/Confirm'
import SnackBar from '@components/lib/SnackBar/SnackBar'

export const ApplicationForm = ({
  uid,
  onKeyDown,
}: {
  uid: number
  onKeyDown: () => void
}): JSX.Element => {
  const token = useSessionCookie()
  const {setIsOpen} = useModalContext()
  const [isSuccess, successMessage, setIsSuccess, handleConfirm] =
    useAddApplication(token, uid, setIsOpen)
  if (isSuccess)
    return (
      <SnackBar
        color='green'
        message={successMessage}
        onClose={() => setIsSuccess(false)}
      />
    )
  return (
    <React.Fragment>
      <div className='h-16 w-full'>
        <span role='article' className='h-1/2'>
          Are you sure you want to apply to this position?
        </span>
      </div>
      <div className='w-full h-1/3 flex'>
        <ConfirmButton onClickAction={handleConfirm}>Confirm</ConfirmButton>
        <CancelButton
          onClickHandler={() => setIsOpen(false)}
          onKeyDownHandler={onKeyDown}
        />
      </div>
    </React.Fragment>
  )
}
