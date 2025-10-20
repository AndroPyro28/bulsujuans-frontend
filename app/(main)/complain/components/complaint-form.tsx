"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, NotepadText } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const ComplaintForm = () => {
  const form = useForm({
    defaultValues: {
      victimName: "",
      contactNo: "",
      alternateMobileNo: "",
      email: "",
      typeOfComplaint: "",
      incidentDetails: "",
      dateAndTime: "",
      remainAnonymous: false,
    },
    // resolver: zodResolver({}),
    mode: "all",
  });

  const isLoading = false;
  const complaintsOption = [
    {
      id: "1",
      name: "harassment",
    },
    {
      id: "2",
      name: "Suicide or self-injury",
    },
    {
      id: "3",
      name: "violence or dangerous organizations",
    },
    {
      id: "4",
      name: "Nudity or sexual activity",
    },
    {
      id: "5",
      name: "Selling or promoting of restricted items",
    },
    {
      id: "6",
      name: "Scam or fraud",
    },
  ];

  return (
    <div className="bg-white w-[90%] h-[90%] rounded-2xl shadow-2xl p-5 overflow-y-auto">
      <div className="flex">
        <NotepadText className="text-md font-light" />{" "}
        <h1 className="text-md font-light"> Complain Form</h1>
      </div>

      <Form {...form}>
        <form autoComplete="off" className="flex flex-col">
          <section className="victim-information my-10 space-y-5 p-2">
            <h2 className="font-bold">Victim Information</h2>

            <FormField
              control={form.control}
              name="victimName"
              key={"victimName"}
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 ">
                    Victim Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isLoading}
                      className=" bg-[#ebebeb] min-w-[50%] border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      type="text"
                      placeholder={`Enter victim name`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNo"
              key={"contactNo"}
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 ">
                    Contact Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isLoading}
                      className=" bg-[#ebebeb] min-w-[50%] border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      type="number"
                      placeholder={`Enter contact number`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alternateMobileNo"
              key={"alternateMobileNo"}
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 ">
                    Alternate Mobile Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isLoading}
                      className=" bg-[#ebebeb] min-w-[50%] border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      type="number"
                      placeholder={`Enter alternate mobile number`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              key={"email"}
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 ">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isLoading}
                      className=" bg-[#ebebeb] min-w-[50%] border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      type="email"
                      placeholder={`Enter email`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <section className="complaint-details my-10 space-y-5 p-2">
            <h2 className="font-bold">Complaint Details</h2>

            <FormField
              control={form.control}
              name="typeOfComplaint"
              key="typeOfComplaint"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                    Type of Complaint
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full bg-[#ebebeb] min-w-[50%] border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0">
                        <SelectValue placeholder="Type of complaint" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {complaintsOption.map((complaint) => (
                        <SelectItem value={complaint.id} key={complaint.id}>
                          {complaint.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="incidentDetails"
              key={"incidentDetails"}
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 ">
                    Incident Description / Details
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      className=" bg-[#ebebeb] min-w-[50%] border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder={`Enter details of incident`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateAndTime"
              key="dateAndTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                    Date and Time of Incident
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      disabled={isLoading}
                      className="bg-[#ebebeb] min-w-[50%] border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full ">
              <FormField
                control={form.control}
                name="remainAnonymous"
                key="remainAnonymous"
                render={({ field }) => (
                  <FormItem className="w-full flex ">
                    <FormControl>
                      <Checkbox
                        className="cursor-pointer"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400 cursor-pointer">
                      I wish to remain anonymous.
                    </FormLabel>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <Button
            variant={"default"}
            type="submit"
            className=" dark:text-white cursor-pointer self-end"
            disabled={isLoading}
          >
            {(() => {
              if (isLoading)
                return (
                  <div className="flex items-center gap-x-3">
                    {" "}
                    Submitting <Loader2 size={20} />
                  </div>
                );
              return "Submit complain";
            })()}
          </Button>
        </form>
      </Form>
    </div>
  );
};
