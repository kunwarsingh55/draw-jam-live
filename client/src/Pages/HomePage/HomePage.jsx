import Navbar from "../../Components/NabBar";
import { DataContext } from "../../Contexts/DataContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const HomePage = () => {

    const { username } = useContext(DataContext);
    return (
        <>
            <div className="h-screen w-screen">
                <Navbar />
                <div className="h-[50%] flex flex-col items-center text-center">
                    <div className="text-6xl mt-10 font-semibold">
                        Draw <span className="text-purple-700">Jam.</span>
                    </div>
                    <div className="text-2xl mt-2">
                        A Real-Time Collaborative Drawing App
                    </div>
                    <div className="flex flex-col gap-4 bg-white rounded-md border-2 border-purple-400 shadow-md  p-6 mt-7">

                        <div className="">Join a Whiteboard</div>
                        <input className="p-2 bg-gray-200 rounded-md" placeholder="Session ID"></input>
                        <button className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min">Join</button>
                    </div>

                    {username == '' ?
                        <div className="text-lg mt-5">
                            or<br />
                            Login to create or access your whiteboards.
                        </div>
                        :

                        <div className="flex flex-col gap-4 bg-white rounded-md border-2 border-purple-400 shadow-md  p-6 mt-7">

                            <Link to='/whiteboard'><button className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min">New White Board</button></Link>

                        </div>

                    }

                </div>
            </div>


        </>
    )
}


export default HomePage;