import { RiRectangleLine } from "react-icons/ri";
import { FaPen, FaSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ToolBox = ({setTool}) => {
    return (
        <>
            <div className="flex gap-4 bg-white rounded-md border-2 border-purple-400 shadow-md  p-6">
                <button onClick={()=>setTool('pen')} className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min"><FaPen /></button>
                <button onClick={()=>setTool('line')} className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min"><FaSlash /></button>
                <button onClick={()=>setTool('rectangle')} className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min"><RiRectangleLine /></button>
                <button onClick={()=>setTool('pen')} className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min"><MdDelete /></button>
            </div>
        </>
    )
}


export default ToolBox;