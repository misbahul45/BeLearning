'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { OAUTH } from '@/constants'
import OauthButton from './OauthButton'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { AtSign, Lock } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AUTH_VALIDATION } from '@/validations/auth.validation'
import Link from 'next/link'
import Loader from '../Loaders/Loader'
import toast from 'react-hot-toast'
import { sleep } from '@/lib/utils'
import { signinAction } from '@/actions/auth.actions'
import { LOGIN } from '@/types/auth.types'

const SigninForm = () => {
    const searchParams = useSearchParams()

    const form = useForm<LOGIN>({
        resolver: zodResolver(AUTH_VALIDATION.LOGIN),
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    })

    const onSubmit = async (data: LOGIN) => {
        try {
            await sleep()
            await signinAction(data);
            form.reset();
        } catch (error) {
            if((error as Error).message !=='NEXT_REDIRECT') toast.error((error as Error).message);
        }
    }

    React.useEffect(() => {
        if (searchParams.get('error')) {
            toast.error("Invalid email or password")
        }
    }, [searchParams])

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-2/3 w-full mx-auto space-y-6 max-w-lg">
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
                                <div className='flex items-center justify-between'>
                                    <FormLabel className='after:content-["*"] after:ml-0.5 after:text-red-600'>Password</FormLabel>
                                    <Link href="/forgot-password?show=verify" className='text-xs text-primary ml-auto hover:text-blue hover:scale-105 transition-all duration-75'>Forgot Password?</Link>
                                </div>
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
                    <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid} className='font-semibold w-full py-4'>
                        {form.formState.isSubmitting ? <Loader /> : <span>Login To Your Account</span>}
                    </Button>
                </form>
                <div className='flex gap-1 items-center w-full max-w-sm mx-auto'>
                    <div className='w-1/2 h-0.5 bg-slate-400'></div>
                    <p className='text-slate-400'>or</p>
                    <div className='w-1/2 h-0.5 bg-slate-400'></div>
                </div>
                <div className='flex gap-4 mb-8 w-2/3 mx-auto justify-center'>
                    {OAUTH.map((item) => (
                        <OauthButton key={item.id} fn={item.fn} icon={item.icon} />
                    ))}
                </div>
            </Form>
            <p className='text-center text-sm'>
                Don&apos;t have an account? <Link href="/sign-up" className='text-primary hover:text-blue hover:font-semibold hover:scale-105 transition-all duration-75'>Sign Up</Link>
            </p>
            <p className='text-gray-400 text-xs'>
                if <span className="text-red-500">error</span> occured, please signin/signup with different provider or try again
            </p>
        </>
    )
}

export default SigninForm
