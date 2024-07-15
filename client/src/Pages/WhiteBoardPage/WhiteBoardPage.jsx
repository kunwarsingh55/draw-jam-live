import Navbar from "../../Components/NabBar";
import WhiteBoardCanvas from '../../Components/WhiteBoardCanvas';

const WhiteBoardPage = () => {
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