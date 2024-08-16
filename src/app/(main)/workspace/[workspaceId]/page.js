'use client'

import { getUserData } from '@/actions/get-user-data'
import Workspace from '@/components/workspace/workspace'
import useUserData from '@/hooks/useUserData'
import { useAppState } from '@/providers/app-provider'
import { useEffect } from 'react'

const WorkspacePage = ({ params: { workspaceId } }) => {
  const { currentWorkspace, setCurrentWorkspace } = useAppState()
  useUserData()

  useEffect(() => {
    if (currentWorkspace !== workspaceId) {
      setCurrentWorkspace(workspaceId)
    }
  }, [workspaceId])

  return <Workspace></Workspace>
}

export default WorkspacePage
