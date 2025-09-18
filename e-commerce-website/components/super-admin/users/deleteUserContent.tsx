"use client";
import Submit from "@/components/submit";
import { deleteUserClerk, formState } from "@/lib/actions/users";
import React from "react";
import Form from "next/form";
import useFormSubmit from "@/lib/hooks/useFormSubmit";

function DeleteUserContent({ userData }) {
  const initalState = {
    errors: {},
  };

  const deleteUserWithId = deleteUserClerk.bind(null, userData.id);

  const {state, formAction, toaster} = useFormSubmit<formState>(initalState, deleteUserWithId, "User Deleted Successfully", "Cannot Delete The User")

  return (
    <>
      {state.errors?.unhandledMessage && (
        <p className="invalid-input-label">{state.errors.unhandledMessage}</p>
      )}
      <p>
        Are you sure you want to delete the {userData.role} {userData.username}
      </p>
      <Form action={formAction}>
        <Submit text="delete" type="dangerous" />
      </Form>
      {toaster}
    </>
  );
}

export default DeleteUserContent;
