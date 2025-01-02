'use client'
import { OAUTH } from '@/constants'
import React from 'react'
import OauthButton from './OauthButton'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { AtSign, Key, Lock, UserRound } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AUTH_VALIDATION } from '@/validations/auth.validation'
import Link from 'next/link'
import { signupAction } from '@/actions/auth.actions'
import { sleep } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Loader from '../ui/Loader'
import { REGISTER } from '@/types/auth.types'

const SignupForm = () => {
    const router=useRouter()
    const form=useForm<REGISTER>({
        resolver:zodResolver(AUTH_VALIDATION.REGISTER),
        defaultValues: {
            username:'',
            email:'',
            password:'',
            confirmPassword:''
        },
        mode:'onChange'
    })

    const onSubmit=async(data:REGISTER)=>{
        try {
            await sleep()
            const user=await signupAction(data);
            const res = await fetch('/api/auth/send-verify', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: user.email,
                }),
            });
    
            if(!res.ok) throw new Error('Email not sent');

            toast.success(`Welcome, verify your email`);
            form.reset();
            router.push('/verify-email');
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

  return (
    <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto space-y-6 max-w-lg">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='after:content-["*"] after:ml-0.5 after:text-red-600'>Username</FormLabel>
                            <FormControl>
                               <div className='relative'>
                                    <UserRound className={`absolute top-1/2 -translate-y-1/2 left-1.5 w-5 h-5 ${form.getValues('username') !== '' ? 'text-primary' : 'text-slate-400'}`} />
                                    <Input placeholder="Input your username" {...field} className='w-full py-5 pl-8' />
                               </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='after:content-["*"] after:ml-0.5 after:text-red-600'>Email</FormLabel>
                            <FormControl>
                               <div className='relative'>
                                    <AtSign className={`absolute top-1/2 -translate-y-1/2 left-1.5 w-5 h-5 ${form.getValues('email') !== '' ? 'text-primary' : 'text-slate-400'}`} />
                                    <Input placeholder="Input your email" {...field} className='w-full py-5 pl-8' />
                               </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='after:content-["*"] after:ml-0.5 after:text-red-600'>Password</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Lock className={`absolute top-1/2 -translate-y-1/2 left-1.5 w-5 h-5 ${form.getValues('password') !== '' ? 'text-primary' : 'text-slate-400'}`} />
                                    <Input placeholder="Input your password" type='password' {...field} className='w-full py-5 pl-8' />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='after:content-["*"] after:ml-0.5 after:text-red-600'>Confirm Password</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Key className={`absolute top-1/2 -translate-y-1/2 left-1.5 w-5 h-5 ${form.getValues('confirmPassword') !== '' ? 'text-primary' : 'text-slate-400'}`} />
                                    <Input placeholder="Input your password" type='password' {...field} className='w-full py-5 pl-8' />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type="submit" className='font-semibold w-full py-6 flex items-center justify-center'>
                    {form.formState.isSubmitting ?  
                       <Loader />
                    : 'Register Your Account'} 
                </Button>
            </form>
            <div className='flex gap-1 my-4 items-center w-full max-w-sm mx-auto'>
                <div className='w-1/2 h-0.5 bg-slate-400'></div>
                <p className='text-slate-400'>or</p>
                <div className='w-1/2 h-0.5 bg-slate-400'></div>
            </div>
            <div className='flex gap-4 mb-8 w-2/3 mx-auto justify-center'>
                {OAUTH.map((item)=>(
                    <OauthButton key={item.id} fn={item.fn} icon={item.icon} />
                ))}
            </div>
        </Form>
        <p className='text-center text-sm'>Have an account? <Link href="/sign-in" className='text-primary hover:text-blue hover:font-semibold hover:scale-105 transition-all duration-75'>Sign In</Link></p>
    </>
  )
}

export default SignupForm