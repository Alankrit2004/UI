import React, { useState, useEffect } from 'react';

export function CustomEmail(props) {
    const { label, isRequired, readOnly, value, onChange, placeholder } = props;
    const [error, setError] = useState('');
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (event) => {
        let newValue = event.target.value.trim();
        newValue = newValue.toUpperCase(); // Convert input to uppercase
        setInputValue(newValue);

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue)) {
            setError('');
            onChange(newValue);
        } else {
            setError('Please enter a valid email address.');
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-xs font-[400]">
                {label.toUpperCase()}
                {isRequired && <span className="text-red-500 gap-3">*</span>}
            </label>
            <input
                type="text" // Corrected here
                required={isRequired}
                readOnly={readOnly}
                value={inputValue} // Changed to use inputValue state
                className={`p-2 border uppercase rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs ${error ? 'border-red-500' : ''}`}
                id="id"
                placeholder={placeholder}
                onChange={handleChange}
            />
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
}

CustomEmail.defaultProps = {
    isRequired: true,
    value: '',
    onChange: () => { },
};

 