'use client';

import {useState} from "react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/react/components/ui/input-group";
import {EyeIcon, EyeOffIcon} from "lucide-react";

export interface PasswordInputProps {
    id?: string;
    placeholder?: string;
    required?: boolean;
}
export function PasswordInput({id, placeholder, required}: PasswordInputProps) {
    const [isHidden, setIsHidden] = useState<boolean>(true);
    return (
        <InputGroup >
            <InputGroupInput
                id={id}
                type={isHidden? "password" : "text"}
                placeholder={placeholder}
                required={required}
            />
            <InputGroupAddon onClick={()=> setIsHidden(!isHidden ) } align="inline-end" className="cursor-pointer">
                {
                    isHidden ?<EyeIcon /> :  <EyeOffIcon />
                }
            </InputGroupAddon>
        </InputGroup>
    )

}