import Navbar from "../../Components/NabBar";
import { DataContext } from "../../Contexts/DataContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const HomePage = () => {

    const navigate = useNavigate();

    const { user, setWhiteBoardSession,sessionId, setsessionId, whiteBoardSession } = useContext(DataContext);
    const [boards, setBoards] = useState([]);


    useEffect(()=>{
        if(!user) return;
        axios.post('http://localhost:3000/api/sessions/all', 
            {
                userId: user.userId
            }
        ).then((r)=>{
            // console.log(r.data.sessions);;
            setBoards(r.data.sessions);
        })
    }, [])


    // create new session and join
    const newWhiteBoardSession = async () => {
        let response = await axios.post('http://localhost:3000/api/sessions',
            {
                "userId": user.userId
            }
        )
        // set sessionID to connect connet to room on websocket
        console.log(response.data);
        setWhiteBoardSession(response.data);
        setsessionId(whiteBoardSession.newSession.sessionId);
        navigate('/whiteboard');
    }

    // just join session
    const joinSession=()=>{
        if(sessionId){
            setWhiteBoardSession({newSession: {sessionId}});
            navigate('/whiteboard');
        }
    }


    return (
        <>
            <div className="h-screen w-screen">
                <Navbar />
                <div className="h-[70%] flex flex-col items-center text-center">
                    <div className="text-6xl mt-10 font-semibold">
                        Draw <span className="text-purple-700">Jam.</span>
                    </div>
                    <div className="text-2xl mt-2">
                        A Real-Time Collaborative Drawing App
                    </div>
                    <div className="flex flex-col gap-4 bg-white rounded-md border-2 border-purple-400 shadow-md  p-6 mt-7">

                        <div className="">Join a Whiteboard</div>
                        <input onChange={(e)=>setsessionId(e.target.value)} className="p-2 bg-gray-200 rounded-md" placeholder="Session ID"></input>
                        <button onClick={joinSession}  className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min">Join</button>
                    </div>

                    {user == null ?
                        <div className="text-lg mt-5">
                            or<br />
                            Login to create or access your whiteboards.
                        </div>
                        :
                        <div className=" m-24 h-80 flex flex-col gap-4 bg-white rounded-md border-2 border-purple-400 shadow-md  p-6">
                            <div >{user.username}'s White Boards with IDs:</div>
                            <div className="overflow-scroll">
                                
                                {boards.map((b)=>{
                                    return(
                                        <>
                                            <div>{b.sessionId}</div>
                                        </>
                                    )
                                })}
                            </div>
                            <button onClick={newWhiteBoardSession} className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min">New White Board</button>
                            
                        </div>

                    }

                </div>
            </div>


        </>
    )
}


export default HomePage;