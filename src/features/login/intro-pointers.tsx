"use client"
import { useAppSelector } from '@/lib/hooks';

function IntroPointers(){
  const user = useAppSelector((state) => state.user);


  console.log("email is :", user.emailId);

  return(
        <>
        <h1 className="text-2xl mt-8 font-bold">Let us practice! {user.emailId}</h1>
       </>
    )
}
  
export default IntroPointers;
