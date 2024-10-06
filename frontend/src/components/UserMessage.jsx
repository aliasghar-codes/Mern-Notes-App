import React from 'react'

const UserMessage = ({ message, img}) => {
    return (
        <div className='text-white flex justify-center items-center flex-col w-[50%] text-center'>
            { img && <img src={ img } className="mb-8 w-60" /> }
            <p className="text-xl leading-8">{ message }</p>
        </div>
    )
}

export default UserMessage