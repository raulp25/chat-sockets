import { useEffect, useMemo, useState } from 'react';


export const useForm = ( initialForm , formValidations = {} ) => {
 
    const [formState, setformState] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
        createValidators();

    }, [formState])

    useEffect(() => {
        setformState( initialForm );

    }, [  ])

    const onInputChange = ( { target:{ name, value } }) => {

        setformState({
            ...formState, [ name ]: value,
            
        });
    };

    const isFormValid = useMemo(() => {
        
        for (const formValue in formValidation) {
            
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;

    }, [formValidation]);

    const onResetForm = () => {
        setformState(initialForm)
    }

    const createValidators = () => {
        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
        
            const [ fn, errorMessage = 'This field is mandatory' ] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );

    }

    return {
        ...formState,
        formState, 
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    }

}

