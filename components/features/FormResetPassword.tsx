'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sleep } from '@/lib/utils';
import Loader from '../ui/Loader';
import { useRouter } from 'next/navigation';
import { validTokenForResetPassword } from '@/actions/auth.actions';
import { Key, Lock, Eye, EyeOff } from 'lucide-react';

const passwordSchema = z.object({
    password: z.string().min(8, "Password is required"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const FormResetPassword = ({ token }: { token?: string }) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    React.useEffect(() => {
        const validateToken = async () => {
            try {
                if (token) {
                    await validTokenForResetPassword(token);
                    toast.success('Token is valid.');
                } else {
                    router.push('/forgot-password');
                    toast.error('Invalid token.');
                }
            } catch {
                router.push('/forgot-password');
                toast.error('Invalid token.');
            }
        };
        validateToken();
    }, [token]);

    const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
        try {
            await sleep();
            // Simulate successful submission or handle reset password logic here
            toast.success('Password reset successful.');
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-white">Reset Password</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
                >
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700">Reset Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Lock
                                            className={`absolute top-1/2 -translate-y-1/2 left-1.5 w-5 h-5 ${
                                                form.getValues('password') !== '' ? 'text-primary' : 'text-slate-400'
                                            }`}
                                        />
                                        <Input
                                            placeholder="Input your password"
                                            type={showPassword ? 'text' : 'password'}
                                            {...field}
                                            className="w-full py-5 pl-8"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute top-1/2 right-2 -translate-y-1/2"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                                <FormDescription className="text-gray-500">
                                    Please input your password.
                                </FormDescription>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700">Confirm Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Key
                                            className={`absolute top-1/2 -translate-y-1/2 left-1.5 w-5 h-5 ${
                                                form.getValues('confirmPassword') !== '' ? 'text-primary' : 'text-slate-400'
                                            }`}
                                        />
                                        <Input
                                            placeholder="Confirm your password"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            {...field}
                                            className="w-full py-5 pl-8"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute top-1/2 right-2 -translate-y-1/2"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                                <FormDescription className="text-gray-500">
                                    Please input your confirm password.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting || !form.formState.isValid}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                    >
                        {form.formState.isSubmitting ? <Loader /> : 'Reset Password'}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default FormResetPassword;
