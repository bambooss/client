import * as React from 'react'

import Panel from '@components/route/Tablist/Panel'
import ProfileForm from '@components/Form/user/Profile'
import useEditUserData from '@hooks/user/useEditUserData'

const EditProfile = ({
  isSelectedTab,
}: {
  isSelectedTab: boolean
}): JSX.Element => {
  const onSubmit = useEditUserData()
  return (
    <Panel index={0} isSelectedTab={isSelectedTab}>
      <ProfileForm onSubmit={onSubmit} />
    </Panel>
  )
}

export default React.memo(EditProfile)
