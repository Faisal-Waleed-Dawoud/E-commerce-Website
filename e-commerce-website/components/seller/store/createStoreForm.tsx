"use client";
import Submit from "@/components/submit";
import { createStoreAction, storeFormState } from "@/lib/actions/stores";
import Form from "next/form";
import React from "react";
import FileUpload from "@/components/fileUpload";
import useFormSubmit from "@/lib/hooks/useFormSubmit";
import useFile from "@/lib/hooks/useFile";

function CreateStoreForm({ sellerId }: { sellerId: string }) {

  const {file:logo, setFile: setLogo, fileRef: logoRef, handleFileChange: handleLogoChange, handleClearFile: handleClearLogo, previewFile: previewLogo} = useFile(null)
  const {file:banner, setFile: setBanner, fileRef: bannerRef, handleFileChange: handleBannerChange, handleClearFile: handleClearBanner, previewFile: previewBanner} = useFile(null)

  const initalState = {
    errors: {},
  };
  
  const createStoreWithId = createStoreAction.bind(null, sellerId);

  const {state, formAction, toaster} = useFormSubmit<storeFormState>(initalState, createStoreWithId, "Store Created Successfully", "Cannot Create The Store", setLogo, setBanner)


  return (
    <>
      {state?.errors?.unhandledErorr && (
        <p className="invalid-input-label">{state.errors.unhandledErorr}</p>
      )}
      <Form action={formAction} className="flex flex-col gap-4">
        <div className="input-container">
          <label htmlFor="storename">
            Store Name<span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            defaultValue={(state?.payload?.get("store-name") || "") as string}
            name="store-name"
            className={`input ${
              state?.errors?.storeName ? "invalid-input" : "filling-input"
            }`}
            id="storename"
          />
          {state?.errors?.storeName && (
            <p className="invalid-input-label">{state.errors.storeName}</p>
          )}
        </div>
        <div className="input-container">
          <label htmlFor="storedesc">
            Store Description<span className="text-red-400">*</span>
          </label>
          <textarea
            defaultValue={
              (state?.payload?.get("store-description") || "") as string
            }
            placeholder="Store description should not be more than 75 words"
            name="store-description"
            className={`input h-40 ${
              state?.errors?.storeName ? "invalid-input" : "filling-input"
            }`}
            id="storedesc"
          />
          {state?.errors?.storeName && (
            <p className="invalid-input-label">{state.errors.storeName}</p>
          )}
        </div>
        <FileUpload
          inputTitle="Store Logo"
          inputName={"store-logo"}
          inputId="storelogo"
          inputRef={logoRef}
          uploadedImage={logo}
          uploadedImagePreview={previewLogo}
          formStateError={state.errors?.storeLogo}
          handleUploadedImage={handleLogoChange}
          handleUploadedImageClear={handleClearLogo}
        />
        <FileUpload
          inputTitle="Store Banner"
          inputName="store-banner"
          inputId="storebanner"
          inputRef={bannerRef}
          uploadedImage={banner}
          uploadedImagePreview={previewBanner}
          formStateError={state.errors?.storeBanner}
          handleUploadedImage={handleBannerChange}
          handleUploadedImageClear={handleClearBanner}
        />
        <div>
          <Submit text={"Create Store"} />
        </div>
      </Form>
      {toaster}
    </>
  );
}

export default CreateStoreForm;
