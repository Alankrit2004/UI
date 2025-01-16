export function CheckBox(props) {
    return (
        <div className="flex" >
            <input type="checkbox" id="checkbox1" />
            <label className="ml-2 text-xs text-gray-700 uppercase" for={'checkbox1'} >
                {props.label.toUpperCase()}
            </label>
        </div>
    );
}
