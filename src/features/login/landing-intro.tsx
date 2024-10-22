"use client"
import {APP_NAME} from '../../helper/app-constants'
import Image from 'next/image'

function LandingIntro(){

    return(
        <div className="hero min-h-full rounded-l-xl bg-base-200">
            <div className="hero-content py-12">
              <div className="max-w-md">

              <h1 className='text-3xl text-center font-bold '>{APP_NAME}</h1>

                <div className="text-center mt-12">
                <Image 
                    src="/intro.png" 
                    alt="Dashwind Admin Template" 
                    width={192} // 设置图片的宽度
                    height={192} // 设置图片的高度
                    className="w-48 inline-block" 
                  />
                </div>
              

                
              </div>

            </div>
          </div>
    )
      
  }
  
  export default LandingIntro