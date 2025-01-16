export function PopUp(props) {
    return (
        <div
            className="fixed top-0 left-0 flex  items-center justify-center w-screen h-screen uppercase"
            ref={props.ref}
        >
            <div className="relative z-20">{props.children}</div>
            <div className="absolute top-0  left-0 z-10 w-full h-full bg-black bg-opacity-50"></div>
        </div>
    );
}
