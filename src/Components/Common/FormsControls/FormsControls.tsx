import React, {Component, FC, ReactNode} from 'react';
import s from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";

// export const Elements = ({input, meta, ...props}) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div className={s.formControl + " " + (hasError ? s.error:'')}>
//             <div>
//                 {
//                 (props.type !== 'checkbox' && <props.type {...input} {...props}/>)||
//                     <input type="checkbox"/>
//                 }
//             </div>
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     );
// }

type FormControlPropsType = {
    meta:WrappedFieldMetaProps
}
const FormControl: FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error:'')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    );
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps} /> </FormControl>
}

export const Input:  FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <input   {...input} {...restProps} /> </FormControl>
}

export const createField = (placeholder: string | undefined,
                            name: string,
                            validators: Array<FieldValidatorType>,
                            component: FC<WrappedFieldProps>,
                            props = {},
                            text = "") => (
    <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
)
