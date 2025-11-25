"use client";

import { FormInput } from "@/components/form/form-input";
import { FormSubmitButton } from "@/components/form/form-submit-button";
import { FormTextarea } from "@/components/form/form-textarea";
import { Form } from "@/components/ui/form";
import { useMutateProcessor } from "@/hooks/useTanstackQuery";
import { storeRoleSchema, TStoreRoleSchema } from "@/schema/role";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotepadText } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateRoleForm = () => {
  const router = useRouter();

  const addComplaint = useMutateProcessor<TStoreRoleSchema | FormData, unknown>({
    url: "/roles/store",
    key: ["roles"],
    method: "POST",
  });

  const isSubmitting = addComplaint.status === "pending";

  const form = useForm({
    defaultValues: {
      name: "",
      desc: "",
    },
    resolver: zodResolver(storeRoleSchema),
    mode: "all",
    disabled: isSubmitting,
  });

  const isDisabled = form.formState.disabled;

  const onSubmit = (data: TStoreRoleSchema) => {
    addComplaint.mutate(data, {
      onSuccess: () => {
        form.reset();
        toast.success("Role created successfully");
        router.push("/roles");
      },
    });
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

            <FormInput control={form.control} name="name" label="Role Name" placeholder="Enter role name" />
            <FormTextarea
              control={form.control}
              name="desc"
              label="Role Description"
              placeholder="Enter details of incident"
              rows={5}
            />
          </section>

          <FormSubmitButton
            label="Submit"
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

export default CreateRoleForm;
