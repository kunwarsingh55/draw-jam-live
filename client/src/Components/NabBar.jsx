import React, { useState } from 'react';
import { MdOutlineDraw } from "react-icons/md";
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <>
            <nav className='flex justify-between  shadow-md p-3 px-6'>
                <div>
                    <MdOutlineDraw className='text-5xl' />
                </div>
                <div className='flex gap-3 items-center text-lg font-semibold'>
                    <Link to='/'>Home</Link>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;