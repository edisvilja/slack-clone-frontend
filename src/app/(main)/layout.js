import WebSocketProvider from '@/providers/ws-provider'
import { ThemeProvider } from 'next-themes'
import { AppStateProvider } from '@/providers/app-provider'

const MainLayout = ({ children }) => {
  return (
    <ThemeProvider attribute="class">
      <AppStateProvider>
        <WebSocketProvider>{children}</WebSocketProvider>
      </AppStateProvider>
    </ThemeProvider>
  )
}

export default MainLayout
