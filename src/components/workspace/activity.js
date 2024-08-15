import ResizableLayout from './resizable-layout'

const ActivityView = () => {
  const sidebarContent = <div className="sidebar-content">Activity Sidebar</div>
  const mainContent = <div className="main-content">Activity Content</div>

  return <ResizableLayout sidebar={sidebarContent} content={mainContent} />
}

export default ActivityView
