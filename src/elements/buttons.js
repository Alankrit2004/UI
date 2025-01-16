import { CustomButton1 } from "components";
import { CustomButton2 } from "components/general-components/CustomButton2.component";
import React from "react";

export const SubmitCancelButtons = ({ mode, loading, onSubmit, onCancel }) => {
    console.log("🚀 ~ file: buttons.js:5 ~ SubmitCancelButtons ~ mode:", mode)
    return (
        <div className="flex justify-center gap-5 mt-5">
            {(mode === "View") ? <div></div> : <div>
                <CustomButton1
                    loading={loading}
                    label={"Submit"}
                    onClick={onSubmit}
                    className="text-white bg-prp-color"
                />
            </div>}
            <div onClick={() => onCancel(false)}>
                <CustomButton2 label={"Cancel"} variant="outlined" className=" text-[#1c4584]" />
            </div>
        </div>
    );
};
