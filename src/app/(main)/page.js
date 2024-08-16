import { getUserData } from '@/actions/get-user-data'
import { redirect } from 'next/navigation'

export default async function Home() {
  const userData = await getUserData()

  if (!userData) {
    return redirect('/auth')
  }

  if (userData.workspaces.length < 1) {
    return redirect('/create-workspace')
  }

  return redirect('/workspace/' + userData.workspaces[0]._id)
}
