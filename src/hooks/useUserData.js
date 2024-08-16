import { useAppState } from '@/providers/app-provider'
import { useEffect } from 'react'

const useUserData = path => {
  const { currentWorkspace, setUser, setWorkspaces } = useAppState()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user/', { credentials: 'include' })

        if (!response.ok) {
          const body = await response.json()
          throw new Error(`HTTP error! Status: ${response.status} - ${body}`)
        }

        const userData = await response.json()
        setUser(userData)
        setWorkspaces(userData.workspaces)
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerdaten:', error)
      }
    }

    fetchUserData()
  }, [currentWorkspace])
}

export default useUserData
