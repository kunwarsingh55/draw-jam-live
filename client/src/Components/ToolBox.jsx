import { RiRectangleLine } from "react-icons/ri";
import { FaPen, FaSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HexColorPicker } from "react-colorful";

const ToolBox = ({setTool, color, setColor}) => {
    return (
        <><HexColorPicker color={color} onChange={setColor} />
            <div className="flex gap-4 bg-white rounded-md border-2 border-purple-400 shadow-md h-24 p-6">
                <button onClick={()=>setTool('pen')} className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min"><FaPen /></button>
                <button onClick={()=>setTool('line')} className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min"><FaSlash /></button>
                <button onClick={()=>setTool('rectangle')} className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min"><RiRectangleLine /></button>
                <button onClick={()=>setTool('erase')} className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min"><MdDelete /></button>
            </div>
        </>
    )
}


export default ToolBox;