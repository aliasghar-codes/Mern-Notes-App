import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io";

const Search = ({ value, setValue, handleSearch, handleClear }) => {
    return (
        <div className='w-80 bg-slate-600 text-white flex items-center py-2 rounded px-4 shadow-md shadow-slate-700'>
            <input 
            type="text" 
            placeholder='Search notes by title' 
            className='bg-transparent w-full outline-none'
            value={value}
            onChange={ e => setValue(e.target.value) }
            />
            {
                value && (
                    <button onClick={ handleClear }> 
                        <IoMdClose className='text-slate-400 text-xl hover:text-white mr-3 ml-3' ></IoMdClose>
                    </button>
                    )
            }
            <button onClick={ handleSearch }>
                <FaMagnifyingGlass className='text-slate-300 hover:text-white' />
            </button>
        </div>
    )
}

export default Search