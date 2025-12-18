import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loginUserHandler } from '../../store/slice/Auth/login-slice'
import { signupUserAction } from '../../store/slice/Auth/signup-slice';
import ToastMessage from '../../components/common/toastMessage/ToastMessage'
import { toast } from 'react-toastify'
import EyeInputbox from '../../components/common/input/eyeinputbox'
import Inputbox from '../../components/common/input/Inputbox'

type FormValues = {
  email: string
  password: string
  remember?: boolean
}

const SigninPage: React.FC = () => {
  const Navigate = useNavigate()
  const dispatch = useAppDispatch()
  const loginState = useAppSelector((state) => state.login)

  const initialValues: FormValues = {
    email: '',
    password: '',
    remember: false,
  }

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(4, 'Password must be at least 4 characters')
        .max(15, 'Password must be at most 15 characters')
        .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
        .matches(/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/, 'Password must contain at least one special character'),
    }),

    onSubmit: (values) => {
      dispatch(loginUserHandler(values))
    },
  });

  useEffect(() => {
    if (loginState?.data && loginState?.data?.data?.token) {
      
      toast.success('Login Successful!')
      setTimeout(() => {
          Navigate('/dashboard')
      }, 3000);
    }
  }, [loginState?.data])

  const SignupCall = () => {
    Navigate('/register')
    dispatch(signupUserAction.signupSliceReset())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center relative py-12 px-4 font-poppins">

      <div className="relative max-w-[28rem] w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10">
          <div className="flex flex-col items-center text-center mb-6">
         
            <h2 className="text-2xl md:text-[1.4rem] font-semibold tracking-tight text-gray-800">Login to Account</h2>
            <p className="text-sm md:text-md text-gray-600 mt-2">Please enter your email and password to continue</p>
          </div>

          <form className="space-y-6" onSubmit={validation.handleSubmit}>
            <div>
              <Inputbox  id="email"  name="email" label="Email address "   required={true}   placeholder="name@example.com"  type="email"  validation={validation}  />
            </div>

            <div>
              {/* <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm  text-gray-600">Password :</label>
                <a href="/forgot-password" className="text-sm  text-gray-600 hover:text-indigo-600 hover:underline">Forgot Password</a>
              </div> */}

              <EyeInputbox id="password" name="password" label='Password' required={true} placeholder="••••••••" type={'password'} validation={validation} />
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm text-gray-600">
                <input type="checkbox" name="remember" className="h-4 w-4 text-indigo-600 rounded" onChange={validation.handleChange} onBlur={validation.handleBlur} checked={validation.values.remember} />
                <span className="ml-2">Remember Password</span>
              </label>
            </div>

            <div>
              <button type="submit"  className="w-full inline-flex justify-center items-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg shadow hover:opacity-95 disabled:opacity-60 font-medium">
                {loginState?.isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>

            <div className="text-center pt-3">
              <p className="text-sm text-gray-500">Don't have an account? <button type="button" onClick={SignupCall} className="text-indigo-600 hover:underline">Create Account</button></p>
            </div>
          </form>
 
        </div>
      </div>

      <ToastMessage />
    </div>
  )
}

export default SigninPage