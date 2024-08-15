'use client'

import Workspace from '@/components/workspace/workspace'
import { useAppState } from '@/providers/app-provider'
import { useEffect } from 'react'

const WorkspacePage = ({ params: { workspaceId } }) => {
  const { currentWorkspace, setCurrentWorkspace } = useAppState()

  useEffect(() => {
    if (currentWorkspace !== workspaceId) {
      setCurrentWorkspace(workspaceId)
    }
  }, [workspaceId])

  return <Workspace></Workspace>
}

export default WorkspacePage
