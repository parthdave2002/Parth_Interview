import type { InputType } from 'reactstrap/types/lib/Input';
import type { ChangeEvent } from 'react';

export interface InputProps {
    id: string;
    name : string;
    label ?: string;
    required ?: boolean;
    placeholder : string;
    type : InputType;
    validation ?: any; 
    className ?: string;
    max ?: string;
    disabled?: boolean;
    value?: string | number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface EyeInputProps {
    id: string;
    name : string;
    label ?: string;
    required ?: boolean;
    placeholder : string;
    type : InputType;
    validation ?: any; 
    className ?: string;
}

// sidebar link type
export interface SidebarProps {
    isOpen?: boolean
    setIsOpen?: (open: boolean) => void
}

// navbar props for sidebar layout
export interface NavbarSidebarLayoutProps {
    toggleSidebar?: () => void;
    isSidebarOpen?: boolean;
}

export interface Option {
  label: string;
  value: string | number;
}

export interface SelectInputProps {
    id: string;
    name: string;
    label?: string;
    required?: boolean;
    placeholder: string;
    options: Option[];
    validation?: any;
    onChange?: (selectedOption: Option | null) => void;
    value?: Option | null;
    className?: string;
}

export interface Item {
  id: string
  title: string
  description?: string
  unit?: string
  quantity: number
  price: number
  margin: number
  total: number
}

export interface Section  {
  id: string
  title: string
  items: Item[]
}