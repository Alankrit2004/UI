import React from 'react';

export function CustomViewTextArea(props) {
    const { label, isRequired, value, onChange, placeHolder } = props;

    const handleChange = (event) => {
        const updatedValue = event.target.value;
        onChange(updatedValue);
    };

    return (
        <div className="flex flex-col">
            <label htmlFor="id" className="text-xs font-[400]">
                {label.toUpperCase()}
            </label>
            <textarea
                required={isRequired}
                placeholder={placeHolder}
                value={value}
                disabled
                className="p-2 min-w-[14rem] bg-white uppercase text-gray-400 text-xs resize-none"
                id="id"
                onChange={handleChange}
            />
        </div>
    );
}

CustomViewTextArea.defaultProps = {
    isRequired: true,
    value: '',
    onChange: () => { },
};

