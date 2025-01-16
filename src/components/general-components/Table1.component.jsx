import { useState, useRef, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";

function SubTd1(props) {
    return (
        <td className="border-b px-2 uppercase">
            <div className="flex justify-center">{props.children}</div>
        </td>
    );
}

function SubTr1(props) {
    return <tr>{props.children}</tr>;
}

function SubTable1(props) {
    return (
        <div className="max-w-full overflow-auto bg-white rounded uppercase">
            <table className="w-full">
                <tr className="">
                    {props.heading.map((item, index) => {
                        return (
                            <td
                                className="px-2 py-1 font-semibold text-xl border-b"
                                key={index}
                            >
                                <div className="flex justify-center">
                                    {item}
                                </div>
                            </td>
                        );
                    })}
                </tr>
                {props.children}
            </table>
        </div>
    );
}

function Td1(props) {
    return (
        <td className="px-1 py-1 border">
            <div className="flex justify-center">{props.children}</div>
        </td>
    );
}

function Tr1(props) {
    let colref = useRef(null);
    let divref = useRef(null);
    let [open, setOpen] = useState(false);

    useEffect(() => {
        colref.current.style.height = "0px";
        divref.current.style.height = "0px";
    }, []);

    function toggle() {
        setOpen(!open);
        if (colref.current.style.height === "0px") {
            colref.current.style.height = "200px";
            divref.current.style.height = "200px";
        } else {
            colref.current.style.height = "0px";
            divref.current.style.height = "0px";
        }
    }

    return (
        <>
            <tr>
                <td className="px-1 py-1 border">
                    <div className="flex items-start justify-center">
                        <div
                            className="border rounded-full shadow press-3"
                            onClick={toggle}
                        >
                            <IoMdAdd className="m-1" />
                        </div>
                    </div>
                </td>
                {props.children}
            </tr>
            <tr className={`overflow-hidden ${open && " bg-gray-300 "} `}>
                <td className="border">
                    <div className="flex justify-center"></div>
                </td>
                <td
                    className={`h-0 transition-all duration-500 border ${open && " p-5 "} `}
                    ref={colref}
                    colSpan={props.column + 1}
                >
                    <div
                        className={`h-0 overflow-auto transition-all duration-500 hide-scrollbar`}
                        ref={divref}
                    >
                        {props.subRow}
                    </div>
                </td>
            </tr>
        </>
    );
}

function Table1(props) {
    return (
        <div className="overflow-hidden rounded-t-md">
            <table className="border-collapse w-full">
                <tr className="text-white bg-prp-color">
                    <td>
                        <div className="flex justify-center"></div>
                    </td>
                    {props.heading.map((item, index) => {
                        return (
                            <td
                                className="px-1 py-2 font-semibold border-l"
                                key={index}
                            >
                                <div className="flex justify-center">
                                    {item}
                                </div>
                            </td>
                        );
                    })}
                </tr>
                {props.children}
            </table>
        </div>
    );
}

export { Table1, Tr1, Td1, SubTable1, SubTr1, SubTd1 };
