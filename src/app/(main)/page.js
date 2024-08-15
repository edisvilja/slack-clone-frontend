import { getUserData } from '@/actions/get-user-data'
import { redirect } from 'next/navigation'

export default async function Home() {
  const userData = await getUserData()

  if (!userData) {
    return redirect('/auth')
  }

  const workspaces = await getUserData('workspaces')

  if (workspaces.length < 1) {
    return redirect('/create-workspace')
  }

  return redirect('/workspace/' + workspaces[0]._id)
}
