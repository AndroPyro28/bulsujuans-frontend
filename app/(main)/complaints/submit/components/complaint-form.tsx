"use client";
import { Form } from "@/components/ui/form";
import { NotepadText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/form/form-input";
import { FormSearch } from "@/components/form/form-search-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormDate } from "@/components/form/form-data";
import { FormSubmitButton } from "@/components/form/form-submit-button";
import { useMutateProcessor } from "@/hooks/useTanstackQuery";
import {
  complaintsOptions,
  ComplaintType,
  TStoreComplaintSchema,
} from "@/schema/complaints";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateFormData } from "@/lib/utils";

export const ComplaintForm = () => {
  const addComplaint = useMutateProcessor<
    TStoreComplaintSchema | FormData,
    unknown
  >({
    url: "/complaints/store",
    key: ["complaints"],
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const isSubmitting = addComplaint.status === "pending"; // || mutation.isPending || complaintOptionsQuery.isLoading

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

  const router = useRouter();

  const { user } = useAuth();

  const isDisabled = form.formState.disabled;
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const onSubmit = (data: any) => {
    const payload: TStoreComplaintSchema & { documents: File[] } = {
      name: data.victimName,
      email: data.email,
      contact_number: data.contactNo.toString(),
      alternate_contact_number: data.alternateMobileNo.toString(),
      incident_detail: data.incidentDetails,
      complaint_type: data.typeOfComplaint,
      date_of_incident: data.dateAndTime,
      complainant_id: user?.id as string,
      documents: files,
    };

    const formData = CreateFormData<TStoreComplaintSchema>(payload);

    addComplaint.mutate(formData, {
      onSuccess(data, variables, onMutateResult, context) {
        toast.success("Complaints submitted", {});
        router.push("/complaints");
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles(selected);
    setPreviews(selected.map((file) => URL.createObjectURL(file)));
  };

  return (
    <div className="bg-white w-full rounded-2xl shadow-2xl p-5 overflow-y-auto">
      <div className="flex">
        <NotepadText className="text-md font-light" />{" "}
        <h1 className="text-md font-light"> Complain Form</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          className="flex flex-col"
        >
          <section className="victim-information my-10 space-y-5 p-2">
            <h2 className="font-bold">Victim Information</h2>

            <FormInput
              control={form.control}
              name="victimName"
              label="Victim Name"
              placeholder="enter victim name"
            />

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

            <FormInput
              type="email"
              control={form.control}
              name="email"
              label="Email"
              placeholder="your email"
            />
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

            <label
              htmlFor="file"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition"
            >
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 15a4 4 0 014-4h10a4 4 0 014 4v6H3v-6zm3-4V5a4 4 0 014-4h4a4 4 0 014 4v6"
                />
              </svg>
              <span className="text-gray-500 mt-2 text-sm">
                Click or drag files to upload
              </span>
              <input
                id="file"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {previews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`preview-${i}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                ))}
              </div>
            )}
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
