// app/(public)/layout.tsx
'use client'
import { useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/AuthProvider'


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuth()
  const mainContentRef = useRef(null);



  // If user is authenticated and still opening login pages, redirect to main menu page
  useEffect(() => {
    if (!isLoading && isAuthenticated && pathname === '/login') {
        router.replace(`/main-menu`)
    }
  console.log("public layout...", isAuthenticated, isLoading)
  }, [isAuthenticated, isLoading, router, pathname])

  return <>
    <div className="drawer">
              <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content flex flex-col ">
              
              <main className="flex-1" ref={mainContentRef}>
                  {children}
              </main>

              
              </div>
          </div>
      </>
}