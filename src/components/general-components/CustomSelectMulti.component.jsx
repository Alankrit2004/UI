import React from 'react';
import Select from 'react-select';
import '../../assets/css/selectbar.css';

export function CustomSelectMulti(props) {
    const { label, isRequired, options, onChange, readOnly, isMulti } = props;
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-xs font-400 ">
                {props.label.toUpperCase()}
                {isRequired && <span className="text-red-500 gap-3">*</span>}
            </label>

            <Select
                options={options}
                // className="px-1.5 py-2 border rounded grow min-w-[14rem] text-gray-400 text-xs outline-none bg-white"
                className="text-black text-xs select-bar-multi uppercase"
                id="id"
                isMulti
                isSearchable
                isDisabled={readOnly}
                menuPortalTarget={document.body} 
                menuPosition={'fixed'}
                onChange={onChange}
                closeMenuOnSelect={false}
                theme={theme => ({
                    ...theme,
                    borderRadius: 4,
                    colors: {
                        ...theme.colors,
                        primary: '#e5e7eb',
                    },
                })}
            />

        </div>
    );
}

CustomSelectMulti.defaultProps = {
    isRequired: true,
};

 