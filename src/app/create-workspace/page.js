"use client"

import { createWorkspace } from "@/actions/create-workspace"
import ImageUpload from "@/components/image-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Ty from "@/components/ui/typography"
import { useWorkspaceCreationState } from "@/hooks/workspaceCreationState"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from 'sonner'

export default function CreateWorkspace() {

  const { currentStep } = useWorkspaceCreationState()

  let stepInView = currentStep == 2 ? (<Step2 />) : (<Step1 />)

  return (
    <div className='w-screen h-screen grid place-content-center bg-neutral-800 text-white'>
      <div className='p-3 max-w-[550px]'>
        <Ty variant='p' className='text-neutral-400'>
          Step {currentStep} of 2
        </Ty>

        {stepInView}
      </div>
    </div>
  )
}

const Step1 = () => {
  const { name, updateName, setCurrentStep } = useWorkspaceCreationState();

  return (
    <>
      <Ty tag="h1" variant="h4" className='my-4'>What is the name of your company or team</Ty>

      <Ty
        className='text-neutral-300'
        variant='p'
      >
        This will be the name of your Slack workspace - choose something that your team will recognize.
      </Ty>

      <form className='mt-6'>
        <fieldset>
          <Input
            className='bg-neutral-700 text-white border-neutral-600'
            type='text'
            value={name}
            placeholder='Enter your company name'
            onChange={event => updateName( event.target.value )}
          />
          <Button
            type='button'
            className='mt-10'
            onClick={() => setCurrentStep(2)}
            disabled={!name}
          >
            <Ty variant='p'>Next</Ty>
          </Button>
        </fieldset>
      </form>
    </>
  );
};

const Step2 = () => {
  const { setCurrentStep, updateImageUrl, imageUrl, name } =
    useWorkspaceCreationState()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await createWorkspace({ imageUrl, name });
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
      return toast.error("Couldn't create workspace. Please try again.");
    }
    toast.success('Workspace created successfully');
    router.push('/');
  };

  return (
    <>
      <Button
        size='sm'
        className='text-white'
        variant='link'
        onClick={() => setCurrentStep(1)}
      >
        <Ty>Back</Ty>
      </Button>

      <form>
        <Ty text='Add workspace avatar' className='my-4' />
        <Ty
          className='text-neutral-300'
          variant='p'>
            This image can be changed later in your workspace settings.
        </Ty>

        <fieldset
          disabled={isSubmitting}
          className='mt-6 flex flex-col items-center space-y-9'
        >
          <ImageUpload />
          <div className='space-x-5'>
            <Button
              onClick={() => {
                updateImageUrl('');
                handleSubmit();
              }}
            >
              <Ty variant='p'>Skip for now</Ty>
            </Button>

            {imageUrl ? (
              <Button
                type='button'
                onClick={handleSubmit}
                size='sm'
                variant='destructive'
              >
                <Ty variant='p'>Submit</Ty>
              </Button>
            ) : (
              <Button
                type='button'
                size='sm'
                className='text-white bg-gray-500'
              >
                <Ty variant='p'>Select an Image</Ty>
              </Button>
            )}
          </div>
        </fieldset>
      </form>
    </>
  );
};