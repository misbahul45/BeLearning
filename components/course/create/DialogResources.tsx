'use client';
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";
import toast from "react-hot-toast";
import Loader from "../../Loaders/Loader";
import { sleep } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Import ShadCN Form components
import { COURSE_VALIDATION, RESOURCE } from "@/validations/course.validation";
import { createResourceAction } from "@/actions/resource.action";

interface Props {
  courseId: string;
  slug: string
}

function DialogResource({ courseId, slug }: Props) {
  const [isPending, startTransition] = React.useTransition();
  const form= useForm<RESOURCE>({
    resolver: zodResolver(COURSE_VALIDATION.RESOURCE),
    mode:'onChange',
    defaultValues: {
      title: '',
      link: '',
    }
  });

  const onSubmit = async (data: RESOURCE) => {
    startTransition(async () => {
      try {
        await sleep();
        await createResourceAction({
          title: data.title,
          url: data.link,
          courseId,
          slug
        })
        form.reset();
        toast.success('Resource added successfully!');
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'icon'} variant={'outline'}>
          <Pencil className='size-6' />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a resource</DialogTitle>
          <DialogDescription>
            Share a resource for this course.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      type="text"
                      {...field}
                      placeholder="github || drive"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="link">Link (Course/Github/Drive)</FormLabel>
                  <FormControl>
                    <Input
                      id="link"
                      type="text"
                      {...field}
                      placeholder="github || drive"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="submit" disabled={!courseId || isPending}>
              {isPending ? <Loader /> : "Add a resource"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogResource;
