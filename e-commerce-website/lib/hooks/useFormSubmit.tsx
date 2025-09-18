import React, { useActionState, useEffect } from 'react'
import { toast } from 'sonner';


function useFormSubmit<Type>(initialState : Type, formFunction, successMessage: string, errorMessage: string, clearFunctionOne?, clearFunctionTwo?) {
    

    const [state, formAction] = useActionState(
        formFunction,
        initialState
    );

    let toaster: string | React.ReactElement = "";

    useEffect(() => {
        if (state.status === 200) {
            toaster = toast.success(successMessage);
        } else if (state.status === 400) {
            if (clearFunctionOne || clearFunctionTwo) {
                clearFunctionOne(null)
                clearFunctionTwo(null)
            }
            toaster = toast.error(errorMessage);
        }
    }, [state]);

    return {state, formAction, toaster}
}

export default useFormSubmit
