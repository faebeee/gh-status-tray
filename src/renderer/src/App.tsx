import { RepositoryList } from './components/repositories/RepositoryList'
import { WorkflowList } from '@renderer/components/WorkflowList'
import { Button } from '@renderer/components/ui/button'
import React from 'react'

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  React.useEffect(() => {
    window.app.getAuthStatus().then(setIsAuthenticated)
  }, [])

  const handleLogin = () => {
    window.app.openAuthUrl()
  }

  return (
    <div className={"p-4 flex flex-col gap-4"}>
      {isAuthenticated ? (
        <RepositoryList />
      ) : (
        <div className={'flex flex-col gap-4 items-center'}>
          <p>Please login to continue</p>
          <Button onClick={handleLogin}>Login with Github</Button>
        </div>
      )}
    </div>
  )
}
