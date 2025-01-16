import * as React from "react";
import Button from "@mui/material/Button";
import { CircularProgress, Tooltip } from "@mui/material";
import { theme } from "layout";

export function CustomButton1(props) {
    return (
        <Tooltip title={props.tooltip ?? ""}>
            <Button
                variant={props.variant ?? "contained"}
                size={props.size ?? "small"}
                className={` ${props.className} justify-center items-center bg-[#1c4584] flex gap-2 justify-center items-center relative uppercase ${props.disabled && "disabled"}`}
                type={props.type ?? "button"}
                disabled={props.loading}
            >
                {props.icon && <span className="text-sm">{props.icon}</span>}
                {Boolean(props?.loading) &&
                    <CircularProgress
                        size={20}
                        sx={{
                            color: theme.colors.primary,
                        }}
                    />}
                {props.label && (
                    <span className={` ${props.className} whitespace-nowrap font-[400] font-Mitr text-black`}>
                        {props.label.toUpperCase()}
                    </span>
                )}

                <div
                    onClick={props.onClick}
                    className="absolute top-0 left-0 w-full h-full"
                ></div>
            </Button>
        </Tooltip>
    );
}
