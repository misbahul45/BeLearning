'use client'
import React from 'react'
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'

const FormEditUser = () => {
    const form=useForm()
    

    const onSubmit = (data: any) => {
        console.log(data)
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}></form>
    </Form>
  )
}

export default FormEditUser