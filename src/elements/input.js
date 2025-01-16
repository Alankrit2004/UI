import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { BsCheck } from "react-icons/bs";
import Select from "react-select";
import "../assets/css/selectbar.css";
import add from "../assets/Cross.svg";
import { FaPlusCircle } from "react-icons/fa";
import { IoInformation } from "react-icons/io5";
import { AiOutlinePlusCircle } from "react-icons/ai";
import DatePicker from "react-datepicker";

const StyledInput = styled.input`
    padding: 0.5rem;
    border-radius: 0.25rem;
    min-width: 14rem;
    background-color: white;
    font-size: 0.75rem;
    border: 1px solid #ccc;
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;
const StyledDropdown = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    max-height: 200px;
    overflow-y: auto;
`;
const StyledOption = styled.div`
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;
const StyledFormControl = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: 0.75rem;
    font-weight: 200;
    .MuiInputBase-input {
        min-width: unset !important;
    }
    .css-b62m3t-container {
        font-weight: 400; /* Corrected font-weight syntax */
    }
`;
const StyledFormControl2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 25px;    
    gap: 0.3rem;
    font-size: 0.75rem;
    font-weight: 200;
    .MuiInputBase-input {
        min-width: unset !important;
    }
    .css-b62m3t-container {
        font-weight: 400; /* Corrected font-weight syntax */
    }
`;
const StyledLabel = styled.label`
    font-size: 0.75rem;
    font-weight: 400;
`;
const StyledLabel2 = styled.label`
    font-size: 0.75rem;
    font-weight: 400;
    display: flex;
    align-items: center;
`;
const StyledSpan = styled.span`
    color: #f00;
    margin-left: 0.25rem;
`;
const StyledTextField = styled(TextField)`
    .MuiInputBase-input {
        text-transform: uppercase;
        padding: 0.5rem;
        border-radius: 0.25rem;
        min-width:  13rem;
        min-height:  1.35rem;
        font-weight: 200;
        background-color: white;
        font-size: 0.75rem;
        &::placeholder {
            font-size: .75rem;
        }
    }
        width:"15rem",
        height: "15rem";

`;

const StyledTextArea = styled.textarea`
    text-transform: uppercase;
    padding: 0.5rem;
    border-radius: 0.25rem;
    min-height: 1.35rem;
    background-color: white;
    font-size: 0.75rem;
    font-weight: 200;
    border: 1px solid #ccc;
    width: auto;
    height: 2.5rem;
    &::placeholder {
        font-size: 0.75rem;
    }
`;

const ErrorText = styled.div`
    color: #f00;
    font-size: 0.75rem;
`;
const StyledCheckBoxWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    width: 2rem;
    height: 2rem;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    background-color: ${({ checked, theme }) => (checked ? theme.colors.primary : "#fff")};
`;
const StyledIcon = styled(BsCheck)`
    color: #fff;
    font-size: 1.5rem;
`;

const customStyles = {
    control: (provided) => ({
        ...provided,
        padding: "0rem",
        borderRadius: "0.25rem",
        backgroundColor: "white",
        fontSize: "0.5rem",
        width: "13rem",
        // fontWeight: 400,
    }),
    menu: (provided) => ({
        ...provided,
        fontSize: "0.75rem",
        fontWeight: "300",
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: "0.75rem",
        // fontWeight: "400",
    }),
};

export function FormTextField({
    control,
    name,
    defaultValue = "",
    placeholder,
    required,
    errors,
    label,
    readOnly,
    hint,
    className,
    type,
    value,
    maxLength,
    Value,
    mode,
    disabled,
    ...rest
}) {
    return (
        <div>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <StyledFormControl className={className}>
                        <StyledLabel htmlFor={name}>
                            {label.toUpperCase()}
                            {required && <StyledSpan>*</StyledSpan>}
                        </StyledLabel>
                        <StyledTextField
                            id={name}
                            type={type ? type : "text"}
                            required={required}
                            placeholder={placeholder}
                            value={Value ? Value : type === "date" ? value?.split("T")[0] : value}
                            readOnly={readOnly}
                            disabled={mode === "View" ? true : false || disabled}
                            onChange={(e) => {
                                const inputValue = e.target.value.toUpperCase();
                                if (!maxLength || inputValue.length <= maxLength) {
                                    onChange(inputValue);
                                }
                            }}
                            error={!!errors}
                            variant="outlined"
                            {...rest}
                        />
                        {errors && <ErrorText>{errors.message || hint}</ErrorText>}
                    </StyledFormControl>
                )}
            />
        </div>
    );
}

export function FormCheckBox({
    control,
    name,
    defaultValue = false,
    label,
    errors,
    disabled,
    hint,
    mode,
    className,
    ...rest
}) {
    return (
        <div>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <StyledFormControl>
                        <StyledLabel htmlFor={name}>{label.toUpperCase()}</StyledLabel>
                        <StyledCheckBoxWrapper
                            checked={value}
                            disabled={disabled || mode === "View" ? true : false}
                            onClick={() => (!disabled || (mode === "View" ? false : true)) && onChange(!value)}
                            {...rest}
                        >
                            {value && <StyledIcon />}
                        </StyledCheckBoxWrapper>
                        {errors && <ErrorText>{errors.message || hint}</ErrorText>}
                    </StyledFormControl>
                )}
            />
        </div>
    );
}

export function FormCheckBox2({
    control,
    name,
    defaultValue = false,
    label,
    errors,
    disabled,
    hint,
    mode,
    className,
    ...rest
}) {
    return (
        <div>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <StyledFormControl2>
                        <StyledCheckBoxWrapper
                            checked={value}
                            disabled={disabled || mode === "View" ? true : false}
                            onClick={() => (!disabled || (mode === "View" ? false : true)) && onChange(!value)}
                            {...rest}
                        >
                            {value && <StyledIcon />}
                        </StyledCheckBoxWrapper>
                        <StyledLabel2 htmlFor={name}>{label.toUpperCase()}</StyledLabel2>
                        {errors && <ErrorText>{errors.message || hint}</ErrorText>}
                    </StyledFormControl2>
                )}
            />
        </div>
    );
}

// import Select from 'react-select'; // Make sure to import Select if not already imported

export function FormSelectField({
    control,
    name,
    options = [],
    placeholder,
    required,
    errors,
    label,
    readOnly,
    className,
    showAddButton,
    normalcase,
    onImageClick,
    showIbutton,
    handelOnChenge,
    mode,
    disabled,
    // isClearable = false, // Add this line to handle the isClearable prop
    ...rest
}) {
    console.log("🚀 ~ file: input.js:197 ~ options:", options);
    return (
        <div>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <StyledFormControl className={className}>
                        <label
                            htmlFor="id"
                            className={`text-xs font-[500] flex items-center justify-between  ${
                                normalcase && "normal-case"
                            }`}
                        >
                            <span>
                                {label?.toUpperCase()}
                                {required && <span className={` text-red-600 text-md`}> *</span>}
                            </span>
                            {showAddButton && (
                                <span
                                    className="text-xl rounded-full text-[#fff] text-first"
                                    onClick={(e) => {
                                        if (onImageClick) {
                                            onImageClick(e);
                                        }
                                    }}
                                >
                                    <FaPlusCircle />
                                </span>
                            )}
                            {showIbutton && (
                                <span className="text-xl rounded-full text-[#fff] bg-first">
                                    <IoInformation />
                                </span>
                            )}
                        </label>
                        <Select
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            id={name}
                            options={options?.map((ele) => ({ ...ele, value: ele?.value?.toString() }))}
                            placeholder={placeholder}
                            value={options.find((option) => option.value?.toString() === value?.toString()) || null}
                            onChange={(selectedOption) => {
                                onChange(selectedOption ? selectedOption.value : null); // Ensure `selectedOption` is handled correctly
                                if (handelOnChenge) {
                                    handelOnChenge();
                                }
                            }}
                            className="css-b62m3t-container"
                            isDisabled={mode === "View" ? true : false || disabled || readOnly}
                            isClearable
                            styles={{
                                ...customStyles,
                                control: (base, state) => ({
                                    ...base,
                                    backgroundColor: readOnly ? "#D3D3D3" : base.backgroundColor,
                                    width: "auto",
                                }),
                            }}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 4,
                                colors: {
                                    ...theme.colors,
                                    primary: "#E5E7EB",
                                },
                            })}
                            {...rest}
                        />
                        {errors && <ErrorText>{errors.message}</ErrorText>}
                    </StyledFormControl>
                )}
            />
        </div>
    );
}

export function FormTextArea({
    control,
    name,
    defaultValue = "",
    placeholder,
    required,
    errors,
    label,
    readOnly,
    hint,
    className,
    maxLength,
    ...rest
}) {
    return (
        <div>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <StyledFormControl className={className}>
                        <StyledLabel htmlFor={name}>
                            {label.toUpperCase()}
                            {required && <StyledSpan>*</StyledSpan>}
                        </StyledLabel>
                        <StyledTextArea
                            id={name}
                            required={required}
                            placeholder={placeholder}
                            value={value}
                            readOnly={readOnly}
                            onChange={(e) => {
                                const inputValue = e.target.value.toUpperCase();
                                if (!maxLength || inputValue.length <= maxLength) {
                                    onChange(inputValue);
                                }
                            }}
                            error={!!errors}
                            {...rest}
                        />
                        {errors && <ErrorText>{errors.message || hint}</ErrorText>}
                    </StyledFormControl>
                )}
            />
        </div>
    );
}
