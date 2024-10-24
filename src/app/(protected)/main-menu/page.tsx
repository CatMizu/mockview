// protected/mainMenu/page.tsx
import IntroPointers from '@/features/login/intro-pointers'
import Link from 'next/link'
import React from 'react'

function MainMenu() {
  return (
    <div className="hero h-4/5 bg-base-200">
    <div className="hero-content">
      <div className="max-w-md">
          <IntroPointers />
          <Link href="/scenarios/project-intake"><button className="btn bg-base-100 btn-outline">Get Started</button></Link>
      </div>
    </div>
  </div>
  )
}

export default MainMenu