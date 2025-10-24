"use client";
import { Form } from "@/components/ui/form";
import { NotepadText } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/form/form-input";
import { FormSearch } from "@/components/form/form-search-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormDate } from "@/components/form/form-data";
import { FormSubmitButton } from "@/components/form/form-submit-button";

export const ComplaintForm = () => {
  const isSubmitting = false; // || mutation.isPending || complaintOptionsQuery.isLoading

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
    disabled: isSubmitting,
  });

  const isDisabled = form.formState.disabled;

  const complaintsOptions = [
    {
      value: "1",
      label: "harassment",
    },
    {
      value: "2",
      label: "Suicide or self-injury",
    },
    {
      value: "3",
      label: "violence or dangerous organizations",
    },
    {
      value: "4",
      label: "Nudity or sexual activity",
    },
    {
      value: "5",
      label: "Selling or promoting of restricted items",
    },
    {
      value: "6",
      label: "Scam or fraud",
    },
  ];

  const onSubmit = (data: any) => {
    console.log("Submitted:", data);
  };

  return (
    <div className="bg-white w-full rounded-2xl shadow-2xl p-5 overflow-y-auto">
      <div className="flex">
        <NotepadText className="text-md font-light" /> <h1 className="text-md font-light"> Complain Form</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="flex flex-col">
          <section className="victim-information my-10 space-y-5 p-2">
            <h2 className="font-bold">Victim Information</h2>

            <FormInput control={form.control} name="victimName" label="Victim Name" placeholder="enter your name" />

            <FormInput
              type="number"
              control={form.control}
              name="contactNo"
              label="Contact Number"
              placeholder="enter contact number"
            />

            <FormInput
              type="number"
              control={form.control}
              name="alternateMobileNo"
              label="Alternate Mobile Number"
              placeholder="enter alternate mobile number"
            />

            <FormInput type="number" control={form.control} name="email" label="Email" placeholder="your email" />
          </section>

          <section className="complaint-details my-10 space-y-5 p-2">
            <h2 className="font-bold">Complaint Details</h2>

            <FormSearch
              control={form.control}
              name="typeOfComplaint"
              label="Type of Complaint"
              options={complaintsOptions}
            />

            <FormTextarea
              control={form.control}
              name="incidentDetails"
              label="Incident Description / Details"
              placeholder="Enter details of incident"
              rows={5}
            />

            <FormDate
              type="datetime-local"
              control={form.control}
              name="dateAndTime"
              label="Date and Time of Incident"
              placeholder=""
            />

            <FormCheckbox
              control={form.control}
              name="remainAnonymous"
              label="I wish to remain anonymous."
              description="Selecting this option will hide your identity from the complaint review process."
            />
          </section>

          <FormSubmitButton
            label="Submit Complain"
            submittingLabel="Submitting"
            disabled={isDisabled}
            isSubmitting={isSubmitting}
            onClear={() => form.reset()} // shows the clear button only when provided
          />
        </form>
      </Form>
    </div>
  );
};
