import React, { useState } from 'react';

export function CustomAlphatext(props) {
    const { label, isRequired, readOnly, value, onChange } = props;
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const newValue = event.target.value.toUpperCase();

        // Check if the value contains only alphanumeric characters
        if (/^[a-zA-Z0-9]*$/.test(newValue)) {
            setErrorMessage('');
            onChange(newValue);
        } else {
            setErrorMessage('Only alphanumeric characters are allowed');
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-xs font-[400]">
                {label.toUpperCase()}
                {isRequired && <span className="text-red-500 gap-3">*</span>}
            </label>
            <input
                type="text"
                required={isRequired}
                readOnly={readOnly}
                value={value}
                className="p-2 border rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs uppercase"
                id="id"
                placeholder={props.placeholder}
                onChange={handleChange}
            />
            {errorMessage && <span className="text-red-500 text-xs">{errorMessage}</span>}
        </div>
    );
}

CustomAlphatext.defaultProps = {
    isRequired: true,
    value: '',
    onChange: () => { },
};
