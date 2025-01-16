import React from 'react';
import Select from 'react-select';
import '../../assets/css/selectbar.css';


export function CustomizeSelectBar(props) {
    const { options, onChange, readOnly } = props;
    return (
        <div className="">
            <Select
                options={options}
                // className="px-1.5 py-2 border rounded grow min-w-[14rem] text-gray-400 text-xs outline-none bg-white"
                className="text-black text-xs select-bar uppercase"
                id="id"
                isSearchable
                isDisabled={readOnly}
                onChange={onChange}
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

CustomizeSelectBar.defaultProps = {
    isRequired: true,
};

 