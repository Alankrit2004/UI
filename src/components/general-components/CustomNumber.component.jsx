import React, { useState } from 'react';

export function CustomNumber(props) {
    const { label, isRequired, readOnly, value, onChange, placeholder } = props;
    const [error, setError] = useState('');

    const handleChange = (event) => {
        let inputValue = event.target.value.trim();

        // Remove all non-digit characters
        inputValue = inputValue.replace(/\D/g, '');

        // Limit to 10 digits
        if (inputValue.length > 10) {
            inputValue = inputValue.slice(0, 10);
        }

        // Update the parent component's state
        onChange(inputValue);

        if (inputValue.length === 10) {
            setError('');
        } else {
            setError('Please enter a 10-digit number.');
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-xs font-[400]">
                {label.toUpperCase()}
                {isRequired && <span className="text-red-500 gap-3">*</span>}
            </label>
            <input
                type="tel"
                required
                readOnly={readOnly}
                className={`p-2 border rounded uppercase grow min-w-[14rem] bg-white text-xs placeholder:text-xs ${error ? 'border-red-500' : ''}`}
                id="id"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
}

CustomNumber.defaultProps = {
    isRequired: true,
};

 