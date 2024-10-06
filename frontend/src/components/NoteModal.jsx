import React, { useState } from 'react'
import { MdClose } from "react-icons/md"
import TagHandler from './TagHandler.jsx'
import axios from 'axios';
import { baseUrl } from '../utils/constants.js';

function NoteModal({ type, handleClose, noteDocument }) {

    const titleState = noteDocument ? noteDocument.title : "";
    const contentState = noteDocument ? noteDocument.content : "";
    const tagsState = noteDocument ? noteDocument.tags : [];

    const [title, setTitle] = useState( titleState );
    const [content, setContent] = useState( contentState );
    const [tags, setTags] = useState( tagsState );
    const [error, setError] = useState("")

    const handleNoteSubmission = () => {

        if (!title) {
            setError("Please Enter Title");
            return;
        }

        if (!content) {
            setError("Please Enter Content");
            return;
        }

        if (type === "Add") {
            addNote();
        } else {
            editNote();
        }
    }

    const addNote = async () => {
        try {
            await axios.post(`${baseUrl}note/add`, {
                title,
                content,
                tags
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            handleClose()
        } catch (error) {
            setError(error.response.data.message);
        }

    }

    const editNote = async () => {
        try {
            const url = `${baseUrl}note/update/${noteDocument._id}`;

            await axios.put(url, {
                title,
                content,
                tags
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            handleClose()
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <aside className='relative py-7 px-6 w-full h-full rounded-md bg-slate-700 text-white'>
            <button
                onClick={handleClose}
                className='absolute top-4 right-6 text-lg text-slate-300 rounded-full hover:text-red-500 transition-all duration-300'>
                <MdClose />
            </button>
            <div className='flex flex-col gap-2'>
                <label htmlFor="" className='text-sm text-slate-100'>TITLE</label>
                <input type="text"
                    value={title}
                    onChange={({ target }) => { setTitle(target.value); setError(""); }}
                    placeholder='Title'
                    className='text-base bg-slate-600 rounded p-3 mb-4 outline-none border-none'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="" className='text-sm text-slate-100'>CONTENT</label>
                <textarea
                    value={content}
                    onChange={({ target }) => { setContent(target.value); setError("") }}
                    placeholder='Content'
                    className='bg-slate-600 outline-none p-3 rounded h-52 resize-none mb-4 text-sm'
                ></textarea>
            </div>
            <div>
                <label htmlFor="" className='text-sm text-slate-100'>TAGS</label>
                <TagHandler tags={tags} setTags={setTags} />
            </div>
            {
                error && <p className='text-red-500 text-sm mt-2'>{error}</p>
            }
            <button
                onClick={handleNoteSubmission}
                className='w-full bg-blue-500 mt-8 rounded py-2 hover:bg-blue-600'>
                { type }
            </button>
        </aside>
    )
}

export default NoteModal