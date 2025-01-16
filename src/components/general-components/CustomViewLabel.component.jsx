import React, { useState } from 'react';

export function CustomViewLabel(props) {
    const { label, isRequired, value, onChange , placeHolder} = props;

    const handleChange = (event) => {
        const uppercasedValue = event.target.value.toUpperCase();
        onChange(uppercasedValue);
    };

    return (
        <div className="flex flex-col ">
            <label htmlFor="id" className="text-xs font-[400]">
                {label.toUpperCase()}
            </label>
            <input
                type="text"
                required={isRequired}
                disabled
                placeholder={placeHolder}
                value={value}
                className="p-2 min-w-[14rem] bg-white uppercase text-gray-400 text-xs"
                id="id"
                onChange={handleChange}
            />
        </div>
    );
}

CustomViewLabel.defaultProps = {
    isRequired: true,
    value: '',
    onChange: () => { },
};
