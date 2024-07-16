import Navbar from "../../Components/NabBar";
import WhiteBoardCanvas from '../../Components/WhiteBoardCanvas';
import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { FaCopy } from "react-icons/fa6";


const WhiteBoardPage = () => {

    const { whiteBoardSession } = useContext(DataContext);

    return (
        <>
            <div className="h-screen w-screen">
                <Navbar />
                {(whiteBoardSession) ?
                    <>
                        <div className="flex justify-between items-center gap-4 bg-white rounded-md border-2 border-purple-400 shadow-md  p-2 my-5 mx-10">
                            <div>
                                Share SessionID to collaborate :  {whiteBoardSession.newSession.sessionId}
                            </div>
                            <button onClick={() => { navigator.clipboard.writeText(whiteBoardSession.newSession.sessionId) }} className="bg-blue-500 text-white rounded-md p-2"><FaCopy /></button>
                        </div>
                        <WhiteBoardCanvas />
                    </> : ""}

                {/* {sessionId ?
                    <>
                        <div className="flex justify-between items-center gap-4 bg-white rounded-md border-2 border-purple-400 shadow-md  p-2 my-5 mx-10">
                            <div>
                                Joined session with ID :  {sessionId}
                            </div>
                        </div>
                        <WhiteBoardCanvas />
                    </>
                    :
                    <div className="flex justify-center items-center gap-4 bg-white rounded-md border-2 border-purple-400 shadow-md  p-2 my-5 mx-10">
                        <div>
                            Please Login to continue
                        </div>
                    </div>
                } */}
            </div>
        </>
    )
}



export default WhiteBoardPage;