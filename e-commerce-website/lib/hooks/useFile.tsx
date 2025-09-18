import React, { useRef, useState } from 'react'


function useFile(initalValue) {
    const [file, setFile] = useState<File | null>(initalValue);
    const fileRef = useRef<File | null>(initalValue);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFile(e.target.files[0]);
    }

    function handleClearFile() {
        setFile(null);
        fileRef.current.value = null;
    }

    const previewFile = file ? URL.createObjectURL(file) : null;

    return {file, fileRef, setFile, handleFileChange, handleClearFile, previewFile}
}

export default useFile
