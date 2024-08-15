import ResizableLayout from './resizable-layout'

const HomeView = () => {
  const sidebarContent = <div className="sidebar-content">Home Sidebar</div>
  const mainContent = <div className="main-content">Home Content</div>

  return <ResizableLayout sidebar={sidebarContent} content={mainContent} />
}

export default HomeView
