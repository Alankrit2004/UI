import React, { useState, useEffect } from 'react';

export function CustomInputNumber(props) {
    const { label, isRequired, readOnly, value, onChange, disabled } = props;
    const [inputValue, setInputValue] = useState(value);
    const [error, setError] = useState('');

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (event) => {
        let newValue = event.target.value.trim();

        // Remove all non-digit characters
        const cleanedValue = newValue.replace(/\D/g, '');

        if (cleanedValue !== newValue) {
            setError('Only Allow Numbers');
        } else {
            setError('');
        }

        setInputValue(cleanedValue);
        onChange(cleanedValue);
    }

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-xs font-[400]">
                {label.toUpperCase()}
                {isRequired && <span className="text-red-500 gap-3">*</span>}
            </label>
            <input
                type="tel"
                required={isRequired}
                readOnly={readOnly}
                className={`p-2 uppercase border rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs ${error ? 'border-red-500' : ''}`}
                id="id"
                disabled={disabled}
                value={inputValue}
                placeholder={props.placeholder}
                onChange={handleChange}
            />
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
}

CustomInputNumber.defaultProps = {
    isRequired: true,
    value: '',
    onChange: () => {},
};

 