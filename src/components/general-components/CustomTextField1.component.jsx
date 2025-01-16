export function TextField(props) {
    const handleChange = (event) => {
        event.target.value = event.target.value.toUpperCase();
      };
    return (
        <div className="flex items-center justify-start w-full px-4 py-3 bg-white border uppercase  border-solid-[rgba(61, 61, 61, 0.30)] rounded">
            {/* ICON */}
            <span>{props.icon}</span>

            <input
                type={ props.type || "text" }
                className="ml-3 text-gray-400 grow bg-white"
                placeholder={props.placeholder}
                onChange={handleChange}
            />
        </div>
    );
}

 