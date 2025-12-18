import type { FC } from 'react'
import { FormFeedback } from 'reactstrap';
import { Label } from "flowbite-react";
import Select from "react-select";
import type { SelectInputProps } from '../../../type/types';

const Selectinput : FC<SelectInputProps> = ({ name,  label,  required, placeholder = "Select option",  options,  validation,  onChange,  value }) => {
  return (
      <div className="flex-1">
               {label && label ? <Label> <div className='block text-sm  text-gray-500'> {label}    {required ? <span className='text-red-500'>*</span> : ""} </div> </Label> : null }
          <div className="mt-1">
              <Select  
                  className="w-full dark:text-gray-800"
                  classNames={{
                      control: () => "react-select__control",
                      singleValue: () => "react-select__single-value",
                      menu: () => "react-select__menu",
                      option: ({ isSelected }) =>
                          isSelected ? "react-select__option--is-selected" : "react-select__option",
                      placeholder: () => "react-select__placeholder",
                  }}
                 
                  onChange={(selectedOption) => {
                      validation?.setFieldValue(name, selectedOption?.value || "");
                      if (onChange) onChange(selectedOption);
                  }}
                   placeholder={placeholder}
                  value={value}
                  options={options}
                  isClearable={true}
              />
              {validation?.touched[name] && validation?.errors[name] && (  <FormFeedback type="invalid" className="text-red-700 text-sm mt-1 block" > {validation.errors[name] as string}</FormFeedback>)}
          </div>
      </div>
  )
}

export default Selectinput