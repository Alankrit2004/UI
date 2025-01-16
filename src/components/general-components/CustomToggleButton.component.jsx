import React, { useState } from 'react';

export function CustomToggleButton() {
    const [toggle, setToggle] = useState(false);

    return (
        <button
            className={`transition ease-in-out duration-300 w-12 bg-gray-200 rounded-full focus:outline-none ${toggle ? 'bg-gray-300' : ''}`}
            onClick={() => setToggle(!toggle)}
        >
            <div
                className={`transition ease-in-out duration-300 rounded-full h-6 w-6 bg-prp-color shadow ${toggle ? 'transform translate-x-full' : ''}`}
            ></div>
        </button>
    );
}

