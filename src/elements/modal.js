import { PopUp } from "components";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";

export const PopUpModal = ({ children, open }) => {
    return (
        <>
            {open && (
                <PopUp>
                    <div className="pb-5 bg-white rounded-lg">{children}</div>
                </PopUp>
            )}
        </>
    );
};

export const TablMainBox = ({ children }) => {
    return <>{children}</>;
};

export const TableHeaderBox = ({ left, left2, showSearch, onSearch }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = ({ target: { value } }) => {
        setSearchValue(value);
        if (onSearch) onSearch(value);
    };

    const handleClear = () => {
        setSearchValue("");
        if (onSearch) onSearch("");
    };

    return (
        <div className="flex flex-row flex-wrap justify-start gap-2  md:flex-nowrap minbox">
            {left}
            {left2}
            {Boolean(showSearch) && (
                <div className="flex items-center justify-between gap-1 px-2  ml-auto text-[rgba(0, 0, 0, 0.50)] border rounded bg-white shrink grow md:grow-0">
                    <input
                        type="text"
                        className="w-[150px] grow uppercase bg-transparent placeholder:text-sm"
                        placeholder="SEARCH"
                        value={searchValue}
                        onChange={handleInputChange}
                    />
                    {searchValue ? (
                        <IoMdCloseCircle
                            className="min-w-[20px] cursor-pointer"
                            onClick={handleClear}
                        />
                    ) : (
                        <AiOutlineSearch className="min-w-[20px]" />
                    )}
                </div>
            )}
        </div>
    );
};
