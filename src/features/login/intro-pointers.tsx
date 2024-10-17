/* eslint-disable react/no-unescaped-entities */
"use client"
import { useUser } from "@/hooks/useUser"

function IntroPointers(){
  const { emailId } = useUser();

  return(
    <>
      <h1>Let's Practice! {emailId}</h1>
    </>
  )
      
  }
  
  export default IntroPointers