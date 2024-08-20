"use client"
import { useWixClient } from '@/hooks/useWixClient';
import { wixClientServer } from '@/liberary/wixClientServer';
import { LoginState } from '@wix/sdk';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
// import { usePathname } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET PASSWORD",
  EMAIL_VERIFICATION = "PASSWORD_VERIFY"
}

const loginPage = () => {
  const wixClient = useWixClient();
  const isLoggedIn=wixClient.auth.loggedIn();
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [emailCode, setEmailCode] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let [success, setSuccess] = useState("");
  let [message,setMesssage]=useState("");
  let [error, setError] = useState("");
  let [allFieldsRequired, setAllFieldsRequired] = useState(false);
  let [mode, setMode] = useState(MODE.LOGIN)
  let pathName = usePathname();
  let router = useRouter();


  if(isLoggedIn){
    router.push('/')
      }
  const formTitle = mode === MODE.LOGIN ? "Login" :
    mode === MODE.REGISTER ? "Register" :
      mode === MODE.RESET_PASSWORD ? "Reset Password" : "Password Verify"

  const formButton = mode === MODE.LOGIN ? "Login Now" :
    mode === MODE.REGISTER ? "Register Now" :
      mode === MODE.RESET_PASSWORD ? "Reset Password" : "Password Verify"

  // handle Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("")
    setSuccess("")
    let response;
    try {
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password
          })
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            profile: { nickname: username },
            email,
            password,
          })
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            pathName
            )
            setMesssage("Password reset email send. Please check your E-mail!");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode:emailCode,
          })
          break;
        default:
          break;
      }
      switch (response?.loginState) {
        case LoginState.SUCCESS:
          if(mode===MODE.LOGIN){
            setSuccess("Login Successfully! You Are Redired");
            const tokens = await wixClient.auth.getMemberTokensForDirectLogin(response.data.sessionToken);
            Cookies.set('refreshToken',JSON.stringify(tokens.refreshToken),{
              expires:2
            });
            wixClient.auth.setTokens(tokens);
            router.push("/");
          }
          else{
            setSuccess("Register Successfully! You May Login Now");
            setTimeout(() => {
              setMode(MODE.LOGIN)
            },2000);
          }
          break;

        case LoginState.FAILURE:
          if(response.errorCode==="invalidEmail" || response.errorCode==="invalidPassword"){
            setError("User email or password invalid!")
          }
          else if(response.errorCode==='emailAlreadyExists'){
            setError("Email ID already Exists!")
          }
          else if(response.errorCode==="resetPassword"){
            setError("You need to reset your password!")
          }else{
            setError("Something went wrong!")
          }
          case LoginState.EMAIL_VERIFICATION_REQUIRED:
            setMode(MODE.EMAIL_VERIFICATION);
            case LoginState.OWNER_APPROVAL_REQUIRED:
              setMesssage("Your account is pending approval")
      }
    } catch (err) {
      console.log(err)
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);

    }

  }
  return (
    <div id='auth' className='lg:container mx-auto w-full h-[calc(100vh-64px)]  px-4 flex gap-3' >
      <form action="" onSubmit={handleSubmit} className='p-3 w-full my-auto h-fit flex items-center flex-col gap-4'>
        <h2 className='font-bold text-2xl uppercase'>{formTitle}</h2>
        {
          mode == MODE.REGISTER ? (
            <div className='space-y-3'>
              <label htmlFor="username" className='px-1  py-1 text-sm font-semibold'>Username</label><br />
              <input type="text" placeholder='Enter Username' name='username' required
                className='w-full py-1 px-2 border-none outline-none rounded-md text-md font-semibold bg-zinc-200 ring-1 ring-gray-400 text-zinc-800'
                onChange={(e) => setUsername(e.target.value)} />
            </div>
          ) : null
        }
        {
          mode !== MODE.EMAIL_VERIFICATION ? (
            <div className='space-y-1'>
              <label htmlFor="useremail" className='px-1  py-1 text-sm font-semibold '>User Email</label><br />
              <input type="email" name='useremail' placeholder='Info@gamil.com' required
                onChange={(e) => setEmail(e.target.value)}
                className='w-full py-1 px-2 border-none outline-none rounded-md text-md font-semibold bg-zinc-200 ring-1 ring-gray-400 text-zinc-800' />
            </div>
          ) : (
            <div className='space-y-1'>
              <label htmlFor="useremail" className='px-1  py-1 text-sm font-semibold '>Email Code</label><br />
              <input type="text" name='emailcode' placeholder='Email Code' required
                onChange={(e) => setEmailCode(e.target.value)}
                className='w-full py-1 px-2 border-none outline-none rounded-md text-md font-semibold bg-zinc-200 ring-1 ring-gray-400 text-zinc-800' />
            </div>
          )
        }
        {
          mode == MODE.LOGIN || mode == MODE.REGISTER ? (
            <div className='space-y-3'>
              <label htmlFor="userpassword" className='px-1  py-1 text-sm font-semibold '>User Password</label><br />
              <input type="password" name='userpassword' placeholder='Enter Password' required
                onChange={(e) => setPassword(e.target.value)}
                className='w-full py-1 px-2 border-none outline-none rounded-md text-md font-semibold bg-zinc-200 ring-1 ring-gray-400 text-zinc-800' />
            </div>
          ) : null
        }
        {
          allFieldsRequired && <h1 className='bg-red-200 font-semibold text-xl text-slate-800 py-1 px-5'>All Fields Are Required</h1>
        }
        <button className='bg-red-300 text-md font-extrabold w-[255px] text-white py-1 rounded-md disabled:cursor-not-allowed disabled:bg-slate-300'
          disabled={isLoading}>{isLoading ? "Loading..." : formButton}</button>
        {
          mode === "LOGIN" ? <span className='whitespace-nowrap'>
            <span className='cursor-pointer inline-block w-full p-2 text-right' onClick={() => setMode(MODE.RESET_PASSWORD)}>Forgot Password?</span><br />
            You haven't any account? <span onClick={() => setMode(MODE.REGISTER)} className='cursor-pointer'>SignUp</span>

          </span> :
            mode === "REGISTER" ? <span className='whitespace-nowrap'>Already have an account? <span onClick={() => setMode(MODE.LOGIN)} className='cursor-pointer'>SignIN</span></span> :
              mode === "RESET PASSWORD" ? <span onClick={() => setMode(MODE.LOGIN)} className='cursor-pointer'>Go Back For Login</span> : null
          // <span onClick={()=>setMode(MODE.)} className='cursor-pointer'>Go Back</span>
        }
        {
          success && <h1 className='bg-green-400 text-black py-1 px-5 font-semibold whitespace-nowrap md:text-sm text-xs'>{success}</h1>
        }
        {
          error && <h1 className='bg-red-400 text-white py-1 px-5 font-semibold text-sm'>{error}</h1>
        }
  {message &&
    <h3 className='bg-red-300 text-black py-1 px-5 font-semibold whitespace-nowrap md:text-sm text-xs'>{message}</h3>
  }
      </form>
    </div>
  )
}
export default loginPage;