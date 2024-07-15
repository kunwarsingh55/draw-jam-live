
const SaveLoadComponent = ({saveDrawing}) => {
    return (
        <>
            <div className="flex gap-4 bg-white rounded-md border-2 border-purple-400 shadow-md  p-6">
                <button onClick={()=>saveDrawing()} className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min">Save</button>
            </div>
        </>
    )
}


export default SaveLoadComponent;