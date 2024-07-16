
const SaveLoadComponent = ({saveDrawing, saveMessage}) => {
    return (
        <>
            <div className="flex-col justify-center items-center text-center gap-4 bg-white rounded-md border-2 border-purple-400 shadow-md  p-6">
                <button onClick={()=>saveDrawing()} className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min">Save</button>
                <div className="mt-8">{saveMessage}</div>
            </div>
        </>
    )
}


export default SaveLoadComponent;