"use client";

import { FormInput } from "@/components/form/form-input";
import { FormSubmitButton } from "@/components/form/form-submit-button";
import { FormTextarea } from "@/components/form/form-textarea";
import { Form } from "@/components/ui/form";
import { useMutateProcessor } from "@/hooks/useTanstackQuery";
import { TUpdateAccessSchema, updateAccessSchema } from "@/schema/access";
import { Access } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotepadText } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditAccessFormProps = {
  data: Access;
};

const EditAccessForm = ({ data }: EditAccessFormProps) => {
  const router = useRouter();

  const addComplaint = useMutateProcessor<TUpdateAccessSchema | FormData, unknown>({
    url: `/accesss/update/${data.id}`,
    key: ["accesss"],
    method: "PATCH",
  });

  const isSubmitting = addComplaint.status === "pending";

  const form = useForm({
    defaultValues: {
      code: data.code || "",
      name: data.name || "",
      desc: data.desc || "",
    },
    resolver: zodResolver(updateAccessSchema),
    mode: "all",
    disabled: isSubmitting,
  });

  const isDisabled = form.formState.disabled;

  const onSubmit = (data: TUpdateAccessSchema) => {
    addComplaint.mutate(data, {
      onSuccess: () => {
        form.reset();
        toast.success("Access created successfully");
        router.push("/accesss");
      },
    });
  };

  return (
    <div className="bg-white w-full rounded-2xl shadow-2xl p-5 overflow-y-auto">
      <div className="flex">
        <NotepadText className="text-md font-light" /> <h1 className="text-md font-light"> Access Form</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="flex flex-col">
          <section className="my-10 space-y-5 p-2">
            <h2 className="font-bold">Access Information</h2>

            <FormInput control={form.control} name="code" label="Code Name" placeholder="Enter code name" />
            <FormInput control={form.control} name="name" label="Access Name" placeholder="Enter access name" />
            <FormTextarea
              control={form.control}
              name="desc"
              label="Access Description"
              placeholder="Enter access description"
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

export default EditAccessForm;
