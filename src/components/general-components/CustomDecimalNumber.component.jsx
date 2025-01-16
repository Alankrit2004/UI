import React, { useState, useEffect } from 'react';

export function CustomInputDecimalNumber(props) {
    const { label, isRequired, readOnly, value, onChange } = props;
    const [inputValue, setInputValue] = useState(value);
    const [error, setError] = useState('');

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (event) => {
        let newValue = event.target.value.trim();

        // Allow only digits and a single decimal point
        const cleanedValue = newValue.replace(/[^0-9.]/g, '');

        // Check if the value contains more than one decimal point
        if ((cleanedValue.match(/\./g) || []).length > 1) {
            setError('Only one decimal point allowed');
        } else {
            setError('');
            setInputValue(cleanedValue);
            onChange(cleanedValue);
        }
    }

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="custom-number-input" className="text-xs font-[400]">
                {label.toUpperCase()}
                {isRequired && <span className="text-red-500 gap-3">*</span>}
            </label>
            <input
                type="text"
                required={isRequired}
                readOnly={readOnly}
                className={`p-2 uppercase border rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs ${error ? 'border-red-500' : ''}`}
                id="custom-number-input"
                value={inputValue}
                placeholder={props.placeholder}
                onChange={handleChange}
            />
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
}