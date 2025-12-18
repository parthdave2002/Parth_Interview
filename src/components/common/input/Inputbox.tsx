import React from 'react'
import type { FC } from 'react'
import { Label } from 'flowbite-react'
import { FormFeedback, Input } from 'reactstrap';
import type { InputProps } from '../../../type/types';

const Inputbox:FC <InputProps>= ( { label, required, className, id, name, placeholder = "", type = "text", value, validation, max, disabled, onChange}) => {
const isFormik = Boolean(validation && name);

  return (
      <div>
          <div className="flex-1">
              {label && label ? <Label> <div className='block text-sm  text-gray-500'> {label}    {required ? <span className='text-red-500'>*</span> : ""} </div> </Label> : null }
              <div className="mt-1">
                  <Input
                      id={id}
                      name={name}
                      className={className ? className : "mt-1 block w-full px-4 py-2 border rounded-lg border-gray-300 bg-gray-200 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"}
                      placeholder= {placeholder}
                      type= {type ?? "text"}
                      // onChange={onChange ?? validation?.handleChange}
                      // onBlur={validation?.handleBlur}
                      // value={validation?.values?.[name] ?? ""}
            value={isFormik ? validation.values[name] : value}
            onChange={isFormik ? validation.handleChange : onChange}
            onBlur={isFormik ? validation.handleBlur : undefined}
                      invalid={validation?.touched?.[name] && validation?.errors?.[name] ? true : false}
                      max={max}
                      disabled={ disabled ? true : false }
                  />
                    {validation?.touched?.[name] && validation?.errors?.[name] && 
                      <FormFeedback type="invalid" className="text-red-700 text-sm"> {validation.errors[name]}  </FormFeedback>
                    }
              </div>
          </div>
      </div>
  )
}

export default Inputbox