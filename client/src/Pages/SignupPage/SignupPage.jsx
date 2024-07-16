import Navbar from "../../Components/NabBar";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const SignupPage = () => {



    const [warnings, setWarnings] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async () => {
        
        try {
            let response = await axios.post('http://localhost:3000/auth/signup', {
                "username": username,
                "email": email,
                "password": password
            });
            
       
            console.log(response.data);
            setWarnings(["Sign In"])
            
            console.log(warnings);

        } catch (error) {
            if (typeof (error.response.data.msg) == 'string') setWarnings([error.response.data.msg]);
            else setWarnings(error.response.data.msg);
        }
    }
    return (
        <>
            <div className="h-screen w-screen">
                <Navbar />
                <div className="h-[50%] flex flex-col items-center text-center">
                    <div className="text-6xl mt-10 font-semibold">
                        <span className="text-purple-700">Signup</span>
                    </div>
                    <div className="flex flex-col gap-4 bg-white rounded-md border-2 border-purple-400 shadow-md  p-6 mt-14">
                        <div className="">Please enter sign up details</div>
                        <input onChange={(e) => setUsername(e.target.value)} className="p-2 bg-gray-200 rounded-md" placeholder="Username"></input>
                        <input onChange={(e) => setEmail(e.target.value)} className="p-2 bg-gray-200 rounded-md" placeholder="Email"></input>
                        <input onChange={(e) => setPassword(e.target.value)} className="p-2 bg-gray-200 rounded-md" placeholder="Password"></input>
                        <button onClick={handleLogin} className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min">Signup </button>
                    </div>

                    {warnings.length > 0 ?
                        <div className={warnings[0] == "Sign In" ? "flex flex-col gap-4 bg-white rounded-md border-2 border-blue-500 shadow-md  px-8 py-3 mt-10" : "flex flex-col gap-4 bg-white rounded-md border-2 border-red-500 shadow-md  px-8 py-3 mt-10"}>
                            {warnings[0] == "Sign In" ? "Signup Successful" :
                                <ul className="text-left list-disc">
                                    {warnings.map((w) => { return (<li key={w}>{w}</li>) })}
                                </ul>
                            }
                        </div> : ""
                    }
                </div>
            </div>
        </>
    )
}


export default SignupPage;