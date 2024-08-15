'use client'

import { toast } from 'sonner'
import { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import Ty from '@/components/ui/typography'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BsSlack } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { RxGithubLogo } from 'react-icons/rx'
import { MdOutlineAutoAwesome } from 'react-icons/md'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function Auth() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const formSchema = z.object({
    email: z.string().email(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async values => {
    setIsAuthenticating(true)

    try {
      const response = await fetch('http://localhost:3000/auth/mail', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      })

      alert('Check your emails')

      setIsAuthenticating(false)
    } catch (e) {
      alert('Error sending email')
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen p-5 grid text-center place-content-center bg-white">
      <div className="max-w-[450px]">
        <Link href="/" className="flex justify-center items-center gap-3 mb-6">
          <BsSlack size={30}></BsSlack>
          <Ty tag="h1" variant="h2">
            Slack clone
          </Ty>
        </Link>

        <Ty tag="p" variant="h3" className="mb-6">
          Sign in to your slack
        </Ty>

        <div className="flex flex-col space-y-4">
          <Link
            href="/auth/google"
            disabled={isAuthenticating}
            variant="outline"
            className={cn(buttonVariants({ variant: 'outline', className: 'py-6 border-2 flex space-x-3' }))}
          >
            <FcGoogle />
            <Ty className="text-xl">Sign in with Google</Ty>
          </Link>
          <Link
            href="/auth/github"
            disabled={isAuthenticating}
            variant="outline"
            className={cn(buttonVariants({ variant: 'outline', className: 'py-6 border-2 flex space-x-3' }))}
          >
            <RxGithubLogo />
            <Ty className="text-xl">Sign in with Github</Ty>
          </Link>
        </div>

        <div className="flex items-center my-6">
          <span className="mr-[15px] flex-1 border-t bg-neutral-300" />
          <Ty className="uppercase">or</Ty>
          <span className="ml-[15px] flex-1 border-t bg-neutral-300" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={isAuthenticating}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="name@work.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                variant="secondary"
                className="bg-primary hover:bg-primary/90 w-full my-5 text-white"
                type="submit"
              >
                <Ty>Sign in with email</Ty>
              </Button>

              <div className="px-5 py-4 bg-gray-100 rounded-sm">
                <div className="text-gray-500 flex items-center space-x-3">
                  <MdOutlineAutoAwesome />
                  <Ty>We will email you a magic link!</Ty>
                </div>
              </div>
            </fieldset>
          </form>
        </Form>
      </div>
    </div>
  )
}
