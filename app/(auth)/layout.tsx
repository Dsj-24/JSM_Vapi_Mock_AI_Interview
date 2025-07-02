import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'
import { Toaster } from 'sonner'

const authlayout = async ({children}:{children:ReactNode}) => {

   const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated) redirect("/");

  return (
    <div className='auth-layout'>{children}
    <Toaster/></div>

  )
}

export default authlayout