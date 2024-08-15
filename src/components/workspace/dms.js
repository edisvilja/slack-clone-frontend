import ResizableLayout from './resizable-layout'

const DMsView = () => {
  const sidebarContent = <div className="sidebar-content">DMs Sidebar</div>
  const mainContent = <div className="main-content">DMs Content</div>

  return <ResizableLayout sidebar={sidebarContent} content={mainContent} />
}

export default DMsView
