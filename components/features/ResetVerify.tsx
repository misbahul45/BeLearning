'use client'
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Loader from '../Loaders/Loader'; 
import { sleep } from '@/lib/utils';
import toast from 'react-hot-toast';

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
});

const ResetVerify = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async(data: z.infer<typeof formSchema>) => {
        try {
            await sleep();
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(!res.ok) throw new Error('Email not sent');
            toast.success('Email sent successfully!, check your inbox');
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <>
            <h1 className='text-3xl font-bold text-white'>Get Token For Password Reset</h1>
            <Form {...form}>
                <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700 after:content-["*"] after:text-red-500 after:ml-0.5'>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        className={`border ${fieldState.error ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                                        {...field}
                                    />
                                </FormControl>
                                {fieldState.error && (
                                    <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                                )}
                                <FormDescription className='text-gray-500'>
                                    Please enter your email address to receive a token for password reset.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting || !form.formState.isValid}
                    >
                        {form.formState.isSubmitting ? <Loader /> : "Get Token"}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default ResetVerify;
