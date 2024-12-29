'use client';
import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { AtSign, Key, Lock, UserRound, Eye, EyeOff } from 'lucide-react';
import Loader from '../ui/Loader';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import FormImage from './FormImage';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/validations/user.validation';
import { z } from 'zod';
import { USER, USER_TYPES } from '@/types/user.types';
import { sleep } from '@/lib/utils';
import { updateUserAction } from '@/actions/user.action';
import { AUTH_TYPES } from '@/types/auth.types';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
  user: USER;
}

const EditUser = ({ user }: Props) => {
  const router=useRouter()

  const [image, setImage] = React.useState<USER_TYPES.Image| null>({
    url: user.profile?.image?.url || '',
    fileId: user.profile?.image?.fileId || '',
  });

  const form = useForm<z.infer<typeof UserValidation.UPDATE>>({
    defaultValues: {
      username: user.username,
      email: user.email,
      bio: user.profile?.bio || '',
    },
    mode: 'onChange',
    resolver:zodResolver(UserValidation.UPDATE)
  });

  const onSubmit = async (data:z.infer<typeof UserValidation.UPDATE>) => {
    try {
      await sleep();
      await updateUserAction({
        username: data.username,
        bio: data.bio,
        email: data.email ?? '',
        image:{
          url: image?.url || 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
          fileId: image?.fileId || '',
        }
      });
      form.reset();
      toast.success('User updated successfully!');
      router.refresh()
      router.push('/profile');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className='w-full px-6'>
      <FormImage image={image} setImage={setImage} />
      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mx-auto space-y-6 max-w-lg"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <UserRound
                      className={`absolute top-1/2 -translate-y-1/2 left-1.5 w-5 h-5 ${
                        form.getValues('username') ? 'text-primary' : 'text-slate-400'
                      }`}
                    />
                    <Input {...field} className="w-full py-5 pl-8" placeholder="Enter your username" />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <AtSign
                      className={`absolute top-1/2 -translate-y-1/2 left-1.5 w-5 h-5 ${
                        form.getValues('email') ? 'text-primary' : 'text-slate-400'
                      }`}
                    />
                    <Input {...field} className="w-full py-5 pl-8" placeholder="Enter your email" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea {...field} className="w-full py-5" placeholder="Tell us about yourself" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            type="submit"
            className="font-semibold w-full py-6 flex items-center justify-center"
          >
            {form.formState.isSubmitting ? <Loader /> : 'Save Update Profile'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditUser;
