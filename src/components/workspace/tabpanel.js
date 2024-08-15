import React from 'react'
import HomeView from './home'
import DMsView from './dms'
import ActivityView from './activity'
import { useAppState } from '@/providers/app-provider'

const TabPanel = () => {
  const { currentTab } = useAppState()

  const MyTabPanel = ({ children }) => (
    <div className="tab-panel | flex-1 | bg-gray-100 dark:bg-gray-900 dark:text-white | p-4">{children}</div>
  )

  switch (currentTab) {
    case 'home':
      return (
        <MyTabPanel>
          <HomeView />
        </MyTabPanel>
      )
    case 'dms':
      return (
        <MyTabPanel>
          <DMsView />
        </MyTabPanel>
      )
    case 'activity':
      return (
        <MyTabPanel>
          <ActivityView />
        </MyTabPanel>
      )
    default:
      return <MyTabPanel />
  }
}

export default TabPanel
