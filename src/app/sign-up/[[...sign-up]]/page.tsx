import {SignUp} from '@clerk/nextjs'

function SignupPage() {
  return (
    <div className='py-10 min-h-screen flex justify-center w-full bg-[#262626]'>
      <SignUp signInFallbackRedirectUrl={"/subscribe"}/>
    </div>
  )
}

export default SignupPage
