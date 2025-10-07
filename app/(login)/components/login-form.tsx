"use client";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
// import { signIn } from "next-auth/react";
import bulsuIcon from '@/public/assets/BSU.png'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.email('Invalid Email').min(1, {
    message: "This field is required",
  }),
});

type formSchemaType = z.infer<typeof formSchema> | FieldValues;

const LoginForm = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<formSchemaType> = async (values) => {
    try {
    //   const response = await signIn("credentials", {
    //     ...values,
    //     redirect: false,
    //   });

    //   if (response?.error) {
    //     toast.error("invalid credentials");
    //   }

    //   if (response?.ok && !response.error) {
    //     toast.success("Logged In!");
    //     router.refresh();
      } catch (error) {
    //   toast.error("Something went wrong.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="  flex flex-col w-[90%] md:w-[30%] items-center p-7 rounded-md z-10 font-sans gap-y-10 tracking-widest"
      >
        <div className="h-[110px] w-[110px] relative">
          <Image
            src={bulsuIcon}
            className="object-contain"
            alt="logo"
            fill
          />
        </div>

        <h1 className=" text-2xl font-semibold text-center mx-10 mt-5">
          Sign in with email
        </h1>

        <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, in.</p>

        <div className="flex flex-col items-center w-full gap-2 ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="uppercase text-md font-bold text-black dark:text-secondary/70">
                  {/* Email */}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className=" p-5 bg-white border-0 focus-visible:ring-0 text-white  font-semibold placeholder:text-zinc-300"
                    type="email"
                    placeholder={`Enter email`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isLoading}
          className="cursor-pointer p-2 w-full rounded-sm text-white text-md mt-5 flex justify-center disabled:cursor-not-allowed"
        >
          {(() => {
            if (isLoading) return <Loader2 className="animate-spin " />;
            return "Login";
          })()}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;