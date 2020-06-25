import * as React from 'react';
export declare type InputType = 'text' | 'password' | 'number';
export declare type AutoComplete = 'on' | 'off';
export declare type Size = 'tiny' | 'regular' | 'large';
export interface InputProps {
    name: string;
    type?: InputType;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    autocomplete?: AutoComplete;
    size?: Size;
    icon?: string;
    inlineLabel?: string;
    loading?: boolean;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    info?: string;
    autoFocus?: boolean;
    onClear?: (e: React.MouseEvent<HTMLElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export default Input;
