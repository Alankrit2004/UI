import React from "react";
import { FormModes } from "utility";

export const ModalHeader = ({ title = "", mode = FormModes.Add }) => {
    return (
        <div className="flex bg-prp-color p-4 text-white justify-between rounded-t-lg">
            <h1 className="text-xl font-weight-[400]">
                {mode} {title}
            </h1>
            <div className="flex items-center text-sm"></div>
        </div>
    );
};
