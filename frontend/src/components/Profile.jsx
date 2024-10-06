import React from 'react'
import { sliceName } from '../utils/helper'
import useUserContext from '../utils/context.js'

const Profile = ({ handleLogout }) => {

    const { user } = useUserContext();

    return (
        <div className='flex gap-4 items-center text-white'>
            <div className='rounded-full bg-slate-500 font-semibold text-xl w-16 h-16 flex justify-center items-center select-none'>{sliceName(user?.userName)}</div>
            <div className=''>
                <div className='font-bold tracking-tighter'>{user?.userName}</div>
                <button onClick={handleLogout} className='underline font-medium'>Logout</button>
            </div>
        </div>
    )
}

export default Profile