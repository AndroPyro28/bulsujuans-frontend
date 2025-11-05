"use client";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  ArrowBigLeft,
  ArrowLeftCircle,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import logo from "@/public/assets/app-logo.png";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMutateProcessor } from "@/hooks/useTanstackQuery";
import { loginSchema, TLoginSchema } from "@/schema/login-schema";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { AuthUser } from "@/components/providers/auth-provider";
import { useEffect } from "react";
const LoginForm = () => {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push("/services");
    }
  }, [auth.isAuthenticated]);

  const router = useRouter();


  type TLoginResponse = {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    auth: AuthUser;
  };
  const login = useMutateProcessor<TLoginSchema, TLoginResponse>({
    url: "/auth/login",
    key: ["auth-login"],
    method: "POST",
  });
  
  const isLoading =  login.status === 'pending';

  const form = useForm({
    defaultValues: {
      email: "",
      type: "request-otp",
    },
    resolver: zodResolver(loginSchema),
    mode: "all",
  });
  form.watch(["type"]);

  const onSubmit: SubmitHandler<TLoginSchema> = async (values) => {
    try {
      const { type, email } = values;
      const errorStyle = {
        background: "red",
      };
      const successStyle = {
        background: "green",
      };

      if (type === "request-otp") {
        login.mutate(
          {
            type,
            email,
          },
          {
            onSuccess(data, variables, onMutateResult, context) {
              form.setValue("type", "verify-otp");
              toast.success("One time password has been sent to your email", {
                style: successStyle,
              });
            },
            onError(error, variables, onMutateResult, context) {
              if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message, {
                  style: errorStyle,
                });
              } else {
                console.error(error);
              }
            },
          }
        );
      } else if (type === "verify-otp") {
        const { otp } = values;
        login.mutate(
          {
            type,
            email,
            otp,
          },
          {
            onSuccess(data, variables, onMutateResult, context) {
              toast.success("Login successful", {
                style: successStyle,
              });
              window.localStorage.setItem(
                "access-token",
                data.tokens.accessToken
              );
              window.localStorage.setItem(
                "refresh-token",
                data.tokens.refreshToken
              );
              auth.login(
                data.auth,
                data.tokens.accessToken,
                data.tokens.refreshToken
              );
              window.location.assign("/dashboard");
            },
            onError(error, variables, onMutateResult, context) {
              if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message, {
                  style: errorStyle,
                });
                console.log("verify-otp response error", error);
              } else {
                console.error(error);
              }
            },
          }
        );
      } else {
        return null;
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleCancel = () => {
    form.setValue("type", "request-otp");
    form.unregister("otp");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col w-[90%] md:w-[30%] items-center p-7 rounded-md z-10 font-sans gap-y-10 tracking-normal bg-white text-black"
        autoComplete="off"
      >
        {(() => {
          const type = form.getValues("type");
          if (type === "request-otp") {
            return (
              <>
                <div className="h-[150px] w-[150px] relative">
                  <Image
                    src={logo}
                    className="object-contain"
                    alt="logo"
                    fill
                  />
                </div>

                <h1 className=" text-3xl text-zinc-700 text-center mx-10 mt-5 ">
                  Sign in with email
                </h1>

                <p className="text-md text-muted-foreground mt-1 text-center">
                  Empowering students, one tap at a time.
                </p>

                <div className="flex flex-col items-center w-full gap-2 ">
                  <FormField
                    control={form.control}
                    name="email"
                    key={"email"}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="uppercase text-md font-bold text-black dark:text-secondary/70">
                          {/* Email */}
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="h-12 border-1 ring-1 ring-orange-400"
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
              </>
            );
          } else if (type === "verify-otp") {
            return (
              <>
                <ArrowLeftCircle
                  className="self-start text-orange-500 size-10 rounded-[50%]  p-2 cursor-pointer duration-200 hover:animate-pulse hover:bg-zinc-200 "
                  onClick={handleCancel}
                />
                <div className="h-[150px] w-[150px] relative">
                  <Image
                    src={logo}
                    className="object-contain"
                    alt="logo"
                    fill
                  />
                </div>

                <h1 className=" text-3xl text-zinc-700 text-center mx-10 mt-5 ">
                  Verify your email
                </h1>

                <p className="text-md text-muted-foreground mt-1 text-center">
                  Please enter the one-time password sent to your email.
                </p>

                <div className="flex flex-col items-center w-full gap-2 ">
                  <FormField
                    control={form.control}
                    name="otp"
                    key={"otp"}
                    render={({ field }) => {
                      const otpSlotClassname =
                        "border-[#cf8f82] border-2 rounded-md";
                      return (
                        <FormItem className="w-full flex justify-center">
                          <FormLabel className="uppercase text-md font-bold text-black dark:text-secondary/70"></FormLabel>
                          <FormControl>
                            <InputOTP
                              maxLength={6}
                              {...field}
                              className="border-black"
                            >
                              <InputOTPGroup className="flex space-x-5 border-0 ">
                                <InputOTPSlot
                                  index={0}
                                  className={otpSlotClassname}
                                />
                                <InputOTPSlot
                                  index={1}
                                  className={otpSlotClassname}
                                />
                                <InputOTPSlot
                                  index={2}
                                  className={otpSlotClassname}
                                />
                                <InputOTPSlot
                                  index={3}
                                  className={otpSlotClassname}
                                />
                                <InputOTPSlot
                                  index={4}
                                  className={otpSlotClassname}
                                />
                                <InputOTPSlot
                                  index={5}
                                  className={otpSlotClassname}
                                />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </>
            );
          }
          return null;
        })()}

        <Button
          disabled={isLoading}
          className="bg-orange-600 hover:bg-orange-700 transition-all duration-200 h-11 text-lg font-semibold w-full cursor-pointer"
        >
          {(() => {
            const type = form.getValues("type");
            if (isLoading) return <Loader2 className="animate-spin " />;

            return type === "request-otp" ? "Login" : "Verify";
          })()}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
