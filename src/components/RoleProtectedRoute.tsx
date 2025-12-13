import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import SignIn from '@/pages/SignIn'

interface RoleProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: Array<'admin'|'teacher'|'student'|'parent'>
}

export default function RoleProtectedRoute({ children, allowedRoles }: RoleProtectedRouteProps){
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) return <SignIn />

  if (!user || !allowedRoles.includes(user.role as any)){
    return (
      <div style={{padding:20}}>
        <h2>Unauthorized</h2>
        <p>You do not have access to view this page. Please sign in with an account that has appropriate permissions.</p>
      </div>
    )
  }

  return <>{children}</>
}
