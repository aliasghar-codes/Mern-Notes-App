import React, { useState, useRef } from 'react'
import { MdAdd, MdClose } from "react-icons/md"

function TagHandler({ tags, setTags }) {

    const [newTag, setNewTag] = useState("");
    const mainInput = useRef();

    const handleTagEdit = e => {

        const newArray = [...tags];
        const id = e.target.id;
        newArray[id] = e.target.value;

        if (newArray[id] === "") {
            const newArray2 = newArray.filter(Boolean);
            setTags(newArray2);
            return;
        };

        setTags(newArray);

    };

    const handleKeyDown = e => {
        if (e.key === "Enter") handleAddTag()
    }

    const handleAddTag = () => {

        mainInput.current.placeholder = "";

        if (!newTag) return;

        let updatedTag = "";

        if (!newTag.startsWith("#")) { updatedTag = "#" + newTag };

        const newArray = [...tags];

        if (newArray.length === 10) {
            setNewTag("");
            mainInput.current.placeholder = "You can't add more than 10 tags";
            return;
        };

        if (newArray.includes(newTag) || newArray.includes(updatedTag)) {
            setNewTag("");
            mainInput.current.placeholder = "Tag already available";
            return;
        };

        updatedTag ? newArray.push(updatedTag) : newArray.push(newTag);

        setTags(newArray);
        setNewTag("");
    };

    const handleRemoveTag = e => {

        const id = e.target.id;
        const newArray = [...tags];

        newArray.splice(id, 1);
        setTags(newArray);

    }

    return (
        <div>
            <div className='mt-1 mb-3 flex gap-2 flex-wrap'>
                {
                    tags?.map((tag, key) => {
                        return (
                            <span key={key} className='relative h-10 w-1/6 max-w-max inline-block grow'>
                                <input
                                    id={key}
                                    className='px-2 h-9 mt-2 text-sm text-gray-300 outline-none bg-transparent w-[97%] border-2 border-slate-600'
                                    value={tag}
                                    onChange={handleTagEdit}
                                >
                                </input>
                                <button
                                    id={key}
                                    onClick={handleRemoveTag}
                                    className='text-xl bg-slate-700 text-red-500 h-4 w-4 absolute top-1 right-0 flex justify-center items-center'>
                                    <MdClose />
                                </button>
                            </span>
                        )
                    })
                }
            </div>
            <div className='flex align-center'>
                <input
                    ref={mainInput}
                    type="text"
                    value={newTag}
                    onKeyDown={handleKeyDown}
                    onChange={e => { setNewTag(e.target.value); mainInput.current.placeholder = ""; }}
                    className='outline-none bg-transparent border-2 border-slate-600 px-2 text-sm'
                />
                <button
                    onClick={handleAddTag}
                    className='ml-6 border-2 p-2 border-blue-600 text-blue-400 rounded hover:bg-blue-600 hover:text-white'>
                    <MdAdd />
                </button>
            </div>
        </div>
    )
}

export default TagHandler