import React from 'react'
import TabRail from './tabrail'
import TabPanel from './tabpanel'
import { useAppState } from '@/providers/app-provider'

const Workspace = () => {
  const { currentWorkspace } = useAppState()

  if (!currentWorkspace) {
    return <div className="workspace-loading | flex h-screen items-center justify-center | bg-gray-800 text-white">Loading</div>
  }

  return (
    <div className="workspace | flex h-screen">
      <TabRail />
      <TabPanel />
    </div>
  )
}

export default Workspace
