import Navbar from "../../Components/NabBar";
const SignupPage = () => {
    return (
        <>
            <div className="h-screen w-screen">
                <Navbar />
                <div className="h-[50%] flex flex-col items-center text-center">
                    <div className="text-6xl mt-10 font-semibold">
                        <span className="text-purple-700">Signup</span>
                    </div>
                    <div className="flex flex-col gap-4 bg-white rounded-md border-2 border-purple-400 shadow-md  p-6 mt-14">

                        <div className="">Please enter signup details</div>
                        <input className="p-2 bg-gray-200 rounded-md" placeholder="Username"></input>
                        <input className="p-2 bg-gray-200 rounded-md" placeholder="Email"></input>
                        <input className="p-2 bg-gray-200 rounded-md" placeholder="Password"></input>
                        <button className="rounded-md bg-purple-700 text-white py-3 px-5 min-w-min">Signup</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default SignupPage;