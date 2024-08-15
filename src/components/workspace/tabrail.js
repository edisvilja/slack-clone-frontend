import { useAppState } from '@/providers/app-provider'
import React from 'react'

const TabRail = () => {
  const { workspaces, currentWorkspace, setCurrentWorkspace, currentTab, setCurrentTab } = useAppState()

  const handleTabClick = tab => {
    setCurrentTab(tab)
  }

  return (
    <div className="tab-rail | w-1/10 lg:w-1/12 xl:w-[7%] 2xl:w-[5%] | bg-gray-800 text-white p-4">
      <div className="workspace-switcher">
        <select className="w-full bg-gray-900" value={currentWorkspace} onChange={e => setCurrentWorkspace(e.target.value)}>
          {workspaces.map(ws => (
            <option key={ws.id} value={ws.id}>
              {ws.name}
            </option>
          ))}
        </select>
      </div>
      <div className="tabs | flex flex-col items-start | mt-6">
        <button className={currentTab == 'home' ? 'font-bold' : undefined} onClick={() => handleTabClick('home')}>
          Home
        </button>
        <button className={currentTab == 'dms' ? 'font-bold' : undefined} onClick={() => handleTabClick('dms')}>
          DMs
        </button>
        <button className={currentTab == 'activity' ? 'font-bold' : undefined} onClick={() => handleTabClick('activity')}>
          Activity
        </button>
      </div>
    </div>
  )
}

export default TabRail
