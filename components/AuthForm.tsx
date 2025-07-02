"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"


import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"

const AuthFormSchema = (type:FormType)=>{
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(5)
    })
}


import React from 'react'
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"

const AuthForm = ({type}:{type:FormType}) => {
const router = useRouter();
const formSchema = AuthFormSchema(type);

    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
 async  function onSubmit(values: z.infer<typeof formSchema>) {
  try{
          if(type === 'sign-up'){
            const {name,email,password} = values;

            const userCreds = await createUserWithEmailAndPassword(auth,email,password);

    const result = await signUp({
          uid: userCreds.user.uid,
          name: name!,
          email,
          password,
        });

         if (!result.success) {
          toast.error(result.message);
          return;
        }


            toast.success('Account Created Successfully');
            router.push('/sign-in');
            console.log('SIGN_UP',values);
          }
          else{
                const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });
            toast.success('Signed In Successfully');
            router.push('/');
            console.log('SIGN_IN',values);
          }

  }catch(e){
    toast.error(`There was an error : ${e}`)
  }
  } 

  const isSignIn = type  === "sign-in"

  return (
    <div className="card-border lg:min-w-[546px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify center">
           <Image src="/logo.svg" alt="logo" height={32} width={38}/>
           <h2 className="text-primary-100">PrepWise</h2>
            </div>
            <h3 className="">Practice Job interviews with Ai</h3>
        
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
      {!isSignIn && (<FormField 
      control={form.control} 
      name="name" 
      label="Name" 
      placeholder="Your Name" />)}


      <FormField 
      control={form.control} 
      name="email" 
      label="Email" 
      placeholder="Your email adress"
      type="email"
       />
    
    <FormField 
      control={form.control} 
      name="password" 
      label="Password" 
      placeholder="Enter Password"
      type="password" />
        <Button className="btn" type="submit">{isSignIn ? 'Sign In':'Create an Account'}</Button>
      </form>
    </Form>
    
    <p className="text-center">{isSignIn ? 'No account yet' : 'Have an account already?'}
        <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">{!isSignIn ? "Sign In":"Sign Up"}</Link>
    </p>
    
    </div></div>
  )
}

export default AuthForm