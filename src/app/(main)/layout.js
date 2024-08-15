import WebSocketProvider from "@/providers/ws-provider"

const { AppStateProvider } = require("@/providers/app-provider")

const MainLayout = ({children}) => {
  return (
    <AppStateProvider>
      <WebSocketProvider>
        {children}
      </WebSocketProvider>
    </AppStateProvider>
  )
}

export default MainLayout