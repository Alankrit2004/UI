export function CustomDate(props) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-xs font-[400]">
                {props.label.toUpperCase()}
            </label>
            <input
                type="date"
                required
                className="p-2   border rounded grow min-w-[12rem] text-xs placeholder:text-xs bg-white uppercase"
                id="id"
                placeholder={props.placeholder}
                readOnly={props.readOnly}
            />
        </div>
    );
}

 