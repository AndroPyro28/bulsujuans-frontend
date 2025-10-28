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
import { useMutateProcessor } from "@/hooks/useTanstackQuery";
import { TStoreComplaintSchema } from "@/schema/complaints";
import { useAuth } from "@/hooks/useAuth";

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

const addComplaint = useMutateProcessor<TStoreComplaintSchema, unknown>({
  url: '/complaints/store',
  key: ['complaints'],
  method: 'POST',
})

const { user } = useAuth()

  const isDisabled = form.formState.disabled;
  const complaintsOptions = [
    {
      value: "harassment",
      label: "harassment",
    },
    {
      value: "suicide_or_self_injury",
      label: "Suicide or self-injury",
    },
    {
      value: "violence_or_dangerous_organizations",
      label: "violence or dangerous organizations",
    },
    {
      value: "nudity_or_sexual_activity",
      label: "Nudity or sexual activity",
    },
    {
      value: "selling_or_promoting_of_restricted_items",
      label: "Selling or promoting of restricted items",
    },
    {
      value: "scam_or_fraud",
      label: "Scam or fraud",
    },
  ];
  
  const onSubmit = (data: any) => {
    console.log("Submitted:", data);
    addComplaint.mutate({
      name: data.victimName,
      email: data.email,
      contact_number: data.contactNo.toString(),
      alternate_contact_number: data.alternateMobileNo.toString(),
      incident_detail: data.incidentDetails,
      complaint_type: data.typeOfComplaint,
      date_of_incident: data.dateAndTime,
      complainant_id: user?.id as string
    })
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

            <FormInput control={form.control} name="victimName" label="Victim Name" placeholder="enter victim name" />

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

            <FormInput type="email" control={form.control} name="email" label="Email" placeholder="your email" />
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
