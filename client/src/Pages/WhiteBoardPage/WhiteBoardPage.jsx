import Navbar from "../../Components/NabBar";
import WhiteBoardCanvas from '../../Components/WhiteBoardCanvas';
import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";



const WhiteBoardPage = () => {
    const {username} = useContext(DataContext);
    console.log(username)
    return (
        <>
            <div className="h-screen w-screen">
                <Navbar />
                <WhiteBoardCanvas/>
            </div>
        </>
    )
}


export default WhiteBoardPage;