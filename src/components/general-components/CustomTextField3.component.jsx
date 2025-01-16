export function CustomTextField3(props) {
    const { label, isRequired } = props;
    const handleChange = (event) => {
        event.target.value = event.target.value.toUpperCase();
      };
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-xs font-[400] text-white">
                {props.label.toUpperCase()}
                {isRequired && <span className="text-red-500 gap-3">*</span>}
            </label>
            <input
                type="text"
                required
                className="p-2  border rounded grow min-w-[14rem] uppercase bg-white text-xs placeholder:text-xs"
                id="id"
                placeholder={props.placeholder}
                onChange={handleChange}
            />
        </div>
    );
}
CustomTextField3.defaultProps = {
    isRequired: true,
  };
 