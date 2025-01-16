import React, { useState } from 'react';

export function CustomTextField2(props) {
    const { label, isRequired, readOnly, value, onChange} = props;

    const handleChange = (event) => {
        event.target.value = event.target.value.toUpperCase();
        const upperCaseValue = event.target.value.toUpperCase();
        onChange(upperCaseValue);
    };

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-xs font-[400]">
                {label.toUpperCase()}
                {isRequired && <span className="text-red-500 gap-3">*</span>}  
            </label>
            <input
                type="text"
                required
                readOnly={readOnly}
                value={value}
                className="p-2 border rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs uppercase"
                id="id"
                placeholder={props.placeholder}
                onChange={handleChange}
            />
        </div>
    );
}

 