"use client";

import { FormInput } from "@/components/form/form-input";
import { FormSearch } from "@/components/form/form-search-input";
import { FormSubmitButton } from "@/components/form/form-submit-button";
import { FormTextarea } from "@/components/form/form-textarea";
import { Form } from "@/components/ui/form";
import { useMutateProcessor } from "@/hooks/useTanstackQuery";
import { Option } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { NotepadText } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const addAccessSchema = z.object({
  role_id: z.string("Role id is required"),
  access_id: z.string("Access id is required"),
});

export type TAddAccessSchema = z.infer<typeof addAccessSchema>;

type AddAccessFormProps = {
  accessOptions: Option[];
  role_id: string;
};

const AddAccessForm = ({ accessOptions, role_id }: AddAccessFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const addComplaint = useMutateProcessor<TAddAccessSchema, unknown>({
    url: "/access/store/add-access",
    key: ["access"],
    method: "POST",
  });

  const isSubmitting = addComplaint.status === "pending";

  const form = useForm({
    defaultValues: {
      role_id: role_id || "",
      access_id: "",
    },
    resolver: zodResolver(addAccessSchema),
    mode: "all",
    disabled: isSubmitting,
  });

  const isDisabled = form.formState.disabled;

  const onSubmit = (data: TAddAccessSchema) => {
    addComplaint.mutate(data, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["access-options"] });
        toast.success("Access added successfully");
        router.push(`/roles/${role_id}`);
      },
    });
  };

  return (
    <div className="bg-white w-full rounded-2xl shadow-2xl p-5 overflow-y-auto">
      <div className="flex">
        <NotepadText className="text-md font-light" /> <h1 className="text-md font-light">Add Access Form</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="flex flex-col">
          <section className="my-10 space-y-5 p-2 sr-only">
            <h2 className="font-bold">Access Information</h2>

            <FormInput
              type="hidden"
              control={form.control}
              name="role_id"
              label="Role Id"
              placeholder="Enter role id"
            />
          </section>
          <section className="my-10 space-y-5 p-2">
            <h2 className="font-bold">Access Information</h2>
            <FormSearch
              control={form.control}
              name="access_id"
              label="Access"
              options={accessOptions || []}
              placeholder="Select access"
              searchPlaceholder="Search access..."
              emptyMessage="No access found"
              className="w-full"
            />
          </section>

          <FormSubmitButton
            label="Submit"
            submittingLabel="Submitting"
            disabled={isDisabled}
            isSubmitting={isSubmitting}
            onClear={() => form.reset()}
          />
        </form>
      </Form>
    </div>
  );
};

export default AddAccessForm;
