import React from 'react';
import Select from 'react-select';
import '../../assets/css/selectbar.css';

export function CustomSelect3(props) {
    const { label, isRequired, options, onChange, readOnly } = props;
    return (
        <div>
            <Select
                options={options}
                // className="px-1.5 py-2 border rounded grow min-w-[14rem] text-gray-400 text-xs outline-none bg-white"
                className="text-black text-xs select-bar uppercase"
                id="id"
                isSearchable
                readOnly={readOnly}
                isDisabled={readOnly}
                onChange={onChange}
                placeholder={props.placeholder}
                closeMenuOnSelect={true}
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

CustomSelect3.defaultProps = {

};
