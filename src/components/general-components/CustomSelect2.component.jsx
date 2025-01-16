export function CustomSelect2(props) {
    const { label, isRequired } = props;
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-xs font-400 ">
                {props.label.toUpperCase()}
                {isRequired && <span className="text-red-500 gap-3">*</span>}
            </label>
            <select
                type="text"
                className="px-1.5 py-2 border uppercase rounded grow min-w-[14rem] text-black text-xs outline-none bg-white"
                id="id"
            >
                <option value="1">Select</option>
                {props.children}
            </select>
        </div>
    );
}
CustomSelect2.defaultProps = {
    isRequired: true,
  };
