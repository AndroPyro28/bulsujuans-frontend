"use client";

import { FormInput } from "@/components/form/form-input";
import { FormSubmitButton } from "@/components/form/form-submit-button";
import { FormTextarea } from "@/components/form/form-textarea";
import { Form } from "@/components/ui/form";
import { useMutateProcessor } from "@/hooks/useTanstackQuery";
import { updateRoleSchema, TUpdateRoleSchema } from "@/schema/role";
import { Role } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotepadText } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditRoleFormProps = {
  data: Role;
};

const EditRoleForm = ({ data }: EditRoleFormProps) => {
  const router = useRouter();

  const addComplaint = useMutateProcessor<TUpdateRoleSchema | FormData, unknown>({
    url: `/roles/update/${data.id}`,
    key: ["roles"],
    method: "PATCH",
  });

  const isSubmitting = addComplaint.status === "pending";

  const form = useForm({
    defaultValues: data,
    resolver: zodResolver(updateRoleSchema),
    mode: "all",
    disabled: isSubmitting,
  });

  const isDisabled = form.formState.disabled;

  const onSubmit = (data: TUpdateRoleSchema) => {
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
        <NotepadText className="text-md font-light" /> <h1 className="text-md font-light"> Role Form</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="flex flex-col">
          <section className="my-10 space-y-5 p-2">
            <h2 className="font-bold">Role Information</h2>

            <FormInput control={form.control} name="name" label="Role Name" placeholder="Enter role name" />
            <FormTextarea
              control={form.control}
              name="desc"
              label="Role Description"
              placeholder="Enter role description"
              rows={5}
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

export default EditRoleForm;
