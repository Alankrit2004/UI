export function Title(props){
    return(
        <div className="flex items-center p-2 pl-0 border-b-2 uppercase" >
            <div className="text-xs  p-1" style={{fontFamily:"mitr", fontSize:"1.4rem"}} >{props.title1}
            </div>
            <div className="px-2 grow" >
                <div className="" ></div>
            </div>
            <div className="text-xs md:text-base" >{props.title2}</div>
        </div>
    )
}