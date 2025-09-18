import Image from 'next/image'
import React from 'react'
import UploadIcon from '@mui/icons-material/Upload';


function FileUpload({
    uploadedImage, 
    inputRef, 
    handleUploadedImage, 
    formStateError, 
    uploadedImagePreview, 
    handleUploadedImageClear, 
    inputName, 
    inputId,
    inputTitle
    } : {
    uploadedImage: File | null,
    inputRef: any,
    handleUploadedImage : (e:React.ChangeEvent<HTMLInputElement>) => void,
    formStateError: any,
    uploadedImagePreview: string | null,
    handleUploadedImageClear: (e:React.ChangeEvent<HTMLInputElement>) => void,
    inputName: string,
    inputId: string,
    inputTitle: string
}) {


    return (
        <>
            <span>{inputTitle} <span className='text-red-400'>*</span></span>
                <div className={`input-container ${uploadedImage ? `hidden` : `block`}`}>
                    <label htmlFor={inputId} className={`h-24 flex gap-2 items-center justify-center flex-col outline-dashed outline-4 cursor-pointer rounded-md duration-300 ${formStateError ? "invalid-file-upload" : "file-upload"}`}>
                        <UploadIcon />
                        <p className='text-sm text-[#888]'>image format should be (png, jpg, jpeg or webp)</p>
                    </label>
                    <input type='file' accept='.png,.jpeg,.jpg,.webp' ref={inputRef} onChange={handleUploadedImage} name={inputName} className={`hidden`} id={inputId} />
                    {formStateError && (<p className='invalid-input-label'>{formStateError}</p>)}
                </div>
                {
                    uploadedImagePreview && (
                        <div className='relative overflow-hidden'>
                        <button type="button" onClick={handleUploadedImageClear} className='absolute top-[3%] right-[3%] rounded-full w-8 h-8 bg-dangerous-light text-white cursor-pointer hover:bg-dangerous duration-300'>X</button>
                        <Image src={uploadedImagePreview} width={300} className='w-full rounded-lg' height={300} alt='' />
                    </div>)
                }
        </>
    )
}

export default FileUpload
