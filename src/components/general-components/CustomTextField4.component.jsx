import React, { useState } from 'react';

export function CustomTextField4(props) {
  const { label, isRequired, readOnly, value, onChange, error } = props;

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
        required={isRequired}
        readOnly={readOnly}
        value={value}
        className={`p-2 border rounded grow min-w-[14rem] bg-white text-xs placeholder:text-xs uppercase ${
          error ? 'border-red-500' : ''
        }`}
        id="id"
        placeholder={props.placeholder}
        onChange={handleChange}
      />

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

CustomTextField4.defaultProps = {
  isRequired: true,
  value: '',
  onChange: () => {},
};

 