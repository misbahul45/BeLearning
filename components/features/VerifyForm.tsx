'use client'
import { checkVerificationToken } from '@/actions/auth.actions';
import React from 'react'
import toast from 'react-hot-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sleep } from '@/lib/utils';
import Loader from '../ui/Loader';

const tokenSchema = z.object({
    token: z.string().min(1, "Token is required"),
});

const VerifyForm = ({ token }:{token?:string}) => {
    const form = useForm<z.infer<typeof tokenSchema>>({
        resolver: zodResolver(tokenSchema),
        defaultValues: {
            token: '',
        }
    });

    React.useEffect(() => {
        const verifyEmail = async () => {
            if (token) {
                try {
                    await checkVerificationToken(token);
                } catch (error) {
                    toast.error((error as Error).message);
                }
            }
        };
        verifyEmail();
    }, [token]);

    const onSubmit = async (data: z.infer<typeof tokenSchema>) => {
        try {
            await sleep();
            await checkVerificationToken(data.token);
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen gap-4 px-4 bg-gradient-to-r from-blue-500 to-purple-500'>
            <h1 className='text-3xl font-bold text-white'>Verify Your Email</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <FormField
                        control={form.control}
                        name="token"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700'>Token</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your token" className='border border-gray-300 rounded-md p-2' {...field} />
                                </FormControl>
                                <FormDescription className='text-gray-500'>
                                    Please enter the token you received.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid} className='w-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200'>
                        {form.formState.isSubmitting?
                            <Loader />
                            :
                            "Verify Account"
                        }
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default VerifyForm;