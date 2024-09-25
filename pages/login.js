import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter()
  const[email, setEmail] = useState();
  const[password, setPassword] = useState();

  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  
    
  }, [])
  

  const handleChange = (e) => {
    if(e.target.name == 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name == 'password'){
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password};
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`,{
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
       },
       body: JSON.stringify(data)
    })
   let response = await res.json();
   console.log(response);
   setEmail('')
   setPassword('')
   if(response.success){
   localStorage.setItem('token', response.token)
   toast.success('You are successfully logged in',{
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
   })
   setTimeout(() => {
    router.push(`${process.env.NEXT_PUBLIC_HOST}/`)
   }, 2000);
  }
  else{
    toast.error(response.error,{
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
   })
  }
  }


  return (
    
    <div>
      <ToastContainer
      position='top-left'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="/logo.jpg" alt="Your Company" />
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} className="space-y-6" method="POST">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input onChange={handleChange} id="email" name="email" type="email" placeholder='Email Address' required className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <Link href="/forgot" className="font-semibold text-purple-600 hover:text-purple-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input onChange={handleChange} id="password" name="password" type="password" placeholder='Password' required className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member? 
      <Link href="/signup" className="font-semibold leading-6 text-purple-600 hover:text-purple-500 cursor-pointer"> Sign Up</Link>
    </p>
  </div>
</div>
</div>
  )
}

export default Login