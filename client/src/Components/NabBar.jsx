import React, { useState } from 'react';
import { MdOutlineDraw } from "react-icons/md";
import { Link } from 'react-router-dom';
import { DataContext } from "../Contexts/DataContext";
import { useContext } from 'react';
import { FaUser } from "react-icons/fa";

const Navbar = () => {

    const { username, setUserName } = useContext(DataContext);
    const url = window.location.href;
   

    return (
        <>
            <nav className='flex justify-between  shadow-md p-3 px-6'>
                <div className='flex gap-4'>
                    <MdOutlineDraw className='text-5xl' />
                    {username != '' ? <div className='flex items-center gap-2 bg-gray-200 rounded-md p-2'>
                        <FaUser />
                        {username}
                    </div> : ""}
                </div>
                <div className='flex gap-3 items-center text-lg font-semibold'>
                    {url != 'http://localhost:5173/' ? <Link to='/'>Home</Link> : "" }
                    
                    {username != '' ? <button onClick={() => { setUserName('') }} >Logout</button> :
                        <>
                            <Link to='/login'>Login</Link>
                            <Link to='/signup'>Signup</Link>
                        </>}


                </div>
            </nav>
        </>
    );
};

export default Navbar;