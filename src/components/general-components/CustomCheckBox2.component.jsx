import { BsCheck } from "react-icons/bs";

export function CustomCheckBox2(props) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-xs font-400">
                {props.label.toUpperCase()}
            </label>
            <div
                className={`${
                    props.state ? " bg-prp-color " : " bg-white "
                } border flex justify-center items-center rounded h-[34px] w-[34px]`}
                onClick={() => !props.disabled && props.setState(!props.state)} // Check disabled prop before toggling state
                style={{ cursor: props.disabled ? 'not-allowed' : 'pointer' }} // Change cursor based on disabled prop
            >
                {props.state && <BsCheck className="text-2xl text-white" />}
            </div>
        </div>
    );
}

 