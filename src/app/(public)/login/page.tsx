//src/app/(public)/login/page.tsx
"use client"

import LandingIntro from '@/features/login/landing-intro';
import InputText from '@/components/input/input-text';
import ErrorText from '@/components/typography/error-text';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthProvider';
import { useAppDispatch } from '@/lib/hooks'; 
import { setEmail } from '@/features/common/userSlice';

interface LoginObj {
  otp: string;
  emailId: string;
}


function Login(): JSX.Element {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showLoginPage, setShowLoginPage] = useState<boolean>(true);
  const [isOtpSent, setIsOtpSent] = useState(false)
  const { login } = useAuth()
  const dispatch = useAppDispatch();

  const [loginObj, setLoginObj] = useState<LoginObj>({
    otp: '',
    emailId: 'demo@gmail.com',
  });
  

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setErrorMessage('');
    if (loading) return;

    if (loginObj.emailId.trim() === '') {
      setErrorMessage('Email Id is required! (use any value)');
      return;
    }

    dispatch(setEmail(loginObj.emailId));

    setLoading(true);
    // 模拟 API 调用，直接登录
    setTimeout(() => {
      loginUser({ token: "asdsadsddsad$$token" });
    }, 1000);
  };





  const loginUser = async({ token }: { token: string;}) => {
    await login(token)
  };

  const updateFormValue = (updateType: string, value: string): void => {
    setErrorMessage('');
    setLoginObj({ ...loginObj, [updateType]: value });
  };

return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div>
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <p className='text-center text-lg md:mt-0 mt-6 mb-12 font-semibold'>Enter Email ID to Continue</p>

                <InputText
                  type="email"
                  defaultValue={loginObj.emailId}
                  updateType="emailId"
                  containerStyle="mt-4"
                  labelTitle="Enter your Email Id"
                  placeholder="Ex - MockView@gmail.com"
                  updateFormValue={updateFormValue}
                />
              </div>
              
              <div className='mt-8'>
                  {errorMessage && <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>}
                  <button type="submit" className={`btn mt-2 w-full btn-primary`}>
                    {loading && <span className="loading loading-spinner"></span>} Be Brave
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Login;
