import { theme } from 'layout';
import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export function CustomPassword(props) {
    const { label, isRequired, readOnly, value, onChange, id, placeholder } = props;
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event) => {
        const inputValue = event.target.value; // Remove conversion to uppercase
        onChange(inputValue); // Update the state with the input value
    };

    return (
        <>
            <div className="flex flex-col gap-1">
                <label htmlFor={id} className="text-xs font-[400]">
                    {label}
                    {isRequired && <span className="text-red-500 gap-3">*</span>}
                </label>
                <div className="relative uppercase flex">
                    <input
                        type={showPassword ? "text" : "password"}
                        required={isRequired} // Use the provided isRequired prop
                        readOnly={readOnly}
                        className="p-2  border rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs uppercase "
                        id={id} // Use the provided id prop
                        // value={value}
                        placeholder={placeholder}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex cursor-pointer items-center rounded-r  px-3 py-1  text-base font-medium text-white"
                        onClick={togglePasswordVisibility}
                        style={{ backgroundColor: theme.colors.primary }}                        
                    >
                        {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </button>

                </div>
                {/* {passwordError && <p className="absolute -bottom-6 text-[10px] font-normal mb-2" style={{ color: 'red' }}>{passwordError}</p>} */}
            </div>
        </>

    );
}

CustomPassword.defaultProps = {
    isRequired: true,
    value: '',
    onChange: () => { },
    id: 'custom-password-input', // Default id for the input
    placeholder: 'Enter Password', // Default placeholder
};

 