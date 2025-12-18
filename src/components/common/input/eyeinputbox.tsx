import React, { useState } from 'react'
import type { FC } from 'react'
import { Label } from 'flowbite-react'
import { FormFeedback, Input } from 'reactstrap';
import type { InputType } from 'reactstrap/types/lib/Input';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import type { EyeInputProps } from '../../../type/types';


const EyeInputbox:FC <EyeInputProps> = ({ label, required, className, id, name, placeholder = "", type = "text", validation}) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType: InputType = isPassword ? (show ? "text" : "password") : (type as InputType);

  return (
      <div>
          <div className="flex-1">
              <Label> <div className='text-sm   text-gray-500'>{label}  {required ? <span className='text-red-500'>*</span> : ""} </div> </Label>
              <div className="mt-1 relative">
                    <Input
                      id={id}
                      name={name}
                      className={className ? className : "block w-full pr-10 px-4 py-2 border border-gray-300 rounded-lg bg-gray-200 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm w-full pr-10"}
                      placeholder={placeholder}
                      type={inputType ?? "text"}
                      onChange={validation?.handleChange}
                      onBlur={validation?.handleBlur}
                      value={validation?.values?.[name] || ""}
                      invalid={validation?.touched?.[name] && validation?.errors?.[name] ? true : false}
                    />

                    {isPassword && (
                      <button   type="button"  onClick={() => setShow(s => !s)}  aria-label={show ? "Hide password" : "Show password"}   className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 p-1 focus:outline-none">
                        {show ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                      </button>
                    )}

                    {validation?.touched?.[name] && validation?.errors?.[name] &&
                      <FormFeedback type="invalid" className="text-red-700 text-sm"> {validation.errors[name]}  </FormFeedback>
                    }
              </div>
          </div>
      </div>
  )
}

export default EyeInputbox