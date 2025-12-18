import type { InputType } from 'reactstrap/types/lib/Input';

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
