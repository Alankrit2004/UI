import { useEffect, useRef } from "react";

export function ToolTipY(props) {
    let toolTipRef = useRef(null);
    let containerRef = useRef(null);
    function closeToolTip() {
        toolTipRef.current.style.height = "0px";
    }
    useEffect(() => {
        closeToolTip();

        if (props.direction == "down") {
            toolTipRef.current.style.top = "120%";
        } else if (props.direction == "up") {
            toolTipRef.current.style.bottom = "120%";
        }

        if (props.position == "left") {
            containerRef.current.style.justifyContent = "flex-start";
        } else if (props.position == "right") {
            containerRef.current.style.justifyContent = "flex-end";
        } else if (props.position == "center") {
            containerRef.current.style.justifyContent = "center";
        }
    });

    function openToolTip() {
        toolTipRef.current.style.height = props.height;
    }
    
    function ToogleToolTop() {
        console.log(toolTipRef.current.style.height);
        if (toolTipRef.current.style.height == "0px") {
            openToolTip();
        } else {
            closeToolTip();
        }
    }

    return (
        <div className="relative flex items-center uppercase" ref={containerRef}>
            <div>
                <div onClick={ToogleToolTop}>{props.title}</div>
            </div>
            <div
                className="absolute z-10 h-0 overflow-auto transition-all bg-white rounded w-fit custom-shadow hide-scrollbar"
                ref={toolTipRef}
            >
                <div>{props.content}</div>
            </div>
        </div>
    );
}
