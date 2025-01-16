import React, { useState, useEffect } from 'react';

export function CustomDateTime(props) {
    const { value, onChange, label, placeholder, readOnly } = props;
    const [dateTimeValue, setDateTimeValue] = useState('');

    useEffect(() => {
        if (value) {
            const date = new Date(value);
            setDateTimeValue(date.toISOString().split('.')[0]); // Truncate milliseconds
        } else {
            // If no value is provided, set the current date and time
            const currentDate = new Date().toISOString().split('.')[0];
            setDateTimeValue(currentDate);
            onChange(currentDate);
        }
    }, [value, onChange]);

    const handleChange = (e) => {
        const selectedDateTime = e.target.value;
        setDateTimeValue(selectedDateTime);
        onChange(selectedDateTime);
    };

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-xs font-[400]">
                {label.toUpperCase()}
            </label>
            <input
                type="datetime-local" // Change input type to datetime-local
                required
                className="p-2 border rounded grow min-w-[12rem] text-xs placeholder:text-xs bg-white uppercase"
                id="id"
                placeholder={placeholder}
                readOnly={readOnly}
                value={dateTimeValue}
                onChange={handleChange}
            />
        </div>
    );
}

CustomDateTime.defaultProps = {
    value: '',
    onChange: () => { },
    label: '',
    placeholder: '',
    readOnly: false,
};

 