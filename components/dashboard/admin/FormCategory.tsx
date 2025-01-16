"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createCategoryAction } from "@/actions/category.action"
import toast from "react-hot-toast"
import Loader from "@/components/Loaders/Loader"

const formSchema = z.object({
  category: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function FormCategory() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        await createCategoryAction(values.category);
        form.reset();
        toast.success('Category created successfully!');
    } catch (error) {
        toast.error((error as Error).message);
    }
  }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 rounded border-2 w-full max-w-xl shadow-lg">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Category</FormLabel>
                  <FormControl>
                    <Input placeholder="category" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is category for course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid}>
                {form.formState.isSubmitting?
                    <Loader />
                    :
                    "Create Category"
                }
            </Button>
          </form>
        </Form>
      )
  }