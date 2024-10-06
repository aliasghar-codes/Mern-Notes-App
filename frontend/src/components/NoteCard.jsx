import React from 'react'
import { MdOutlinePushPin, MdDelete, MdCreate } from "react-icons/md"

function NoteCard({ 
    title,
    date,
    content,
    tags,
    isPinned,
    handlePinNote,
    handleDelete,
    id,
    handleEdit
}) {
    
    return (
        <main className='w-full self-start border-2 hover:shadow-slate-500 border-slate-600 hover:shadow-md p-6 overflow-hidden rounded-md text-white'>
            <div className='flex justify-between items-center mb-6'>
                <div>
                    <h6 className='font-semibold mb-1 text-2xl'>{ title }</h6>
                    <p className='text-xs text-slate-200'>{ date }</p>
                </div>
                <MdOutlinePushPin data-id={ id } data-pin={ isPinned } onClick={ handlePinNote } className={ isPinned ? "text-blue-400 text-xl cursor-pointer" : "text-slate-200 text-xl cursor-pointer"} />
            </div>
            <p className='text-sm text-slate-50 mb-6'>{ content?.slice(0,80)}....</p>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 w-2/4 flex-wrap'>
                    {
                    tags?.map( (tag, key) => {
                        return <p key={key} className='text-xs text-slate-200'>{ tag }</p>
                    })
                    }
                </div>
                <div className='flex gap-2'>
                    <MdCreate className='text-gray-200 text-lg cursor-pointer' data-id={ id } onClick={ handleEdit } />
                    <MdDelete className='text-gray-200 text-lg cursor-pointer' data-id={ id } onClick={ handleDelete } />
                </div>
            </div>
        </main>
    )
}

export default NoteCard