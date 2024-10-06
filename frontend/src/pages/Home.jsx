import React, { useState, useRef, useEffect } from 'react'
import { MdAdd } from "react-icons/md"
import Header from '../components/Header.jsx'
import NoteCard from '../components/NoteCard.jsx'
import Modal from "react-modal"
import NoteModal from '../components/NoteModal.jsx'
import useUserContext from '../utils/context.js'
import { baseUrl } from "../utils/constants.js"
import axios from "axios"
import moment from "moment"
import UserMessage from "../components/UserMessage.jsx";
import addNoteImg from "../assets/Add notes.png";
import addUser from "../assets/add user.png";

const Home = () => {

  const { isLoggedIn } = useUserContext();

  const [inputValue, setInputValue] = useState("");
  const [allNotes, setAllNotes] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState({
    isOpen: false,
    type: "Add",
    data: null
  });

  const span = useRef();

  const getNotes = () => {

    if (isLoggedIn) {

      axios.get(`${baseUrl}note/get-all`, { withCredentials: true, headers: { "Content-Type": "application/json" } })
        .then(response => setAllNotes(response.data.allNotes))
        .catch(() => setAllNotes([]))
    }
  }

  useEffect(() => {

    getNotes();

  }, [ isLoggedIn, inputValue ]);


  const handleMouseEnter = () => {
    span.current.classList.add("bg-sky-500");
  }

  const handleMouseLeave = () => {
    span.current.classList.remove("bg-sky-500");
  }

  const handleClose = () => {

    setModalIsOpen({
      isOpen: false,
      type: "Add",
      data: null
    });

    getNotes();
  }

  const handleNoteEdit = event => {

    let id = "";

    if (event.target.tagName === "path") {
      id = event.target.parentElement.dataset.id;
    } else {
      id = event.target.dataset.id;
    }

    const noteDocument = allNotes.filter(note => note._id === id);

    setModalIsOpen({
      isOpen: true,
      type: "Update",
      data: noteDocument[0]
    });
  }

  const handleNoteDelete = async event => {
    let id = "";

    if (event.target.tagName === "path") {
      id = event.target.parentElement.dataset.id;
    } else {
      id = event.target.dataset.id;
    }

    try {
      const url = `${baseUrl}note/delete/${id}`;

      await axios.delete(url, {
        withCredentials: true,
      });

      getNotes();

    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const handlePinNote = async event => {

    let id = "";
    let isPinnedOld;

    if (event.target.tagName === "path") {
      id = event.target.parentElement.dataset.id;
      isPinnedOld = event.target.parentElement.dataset.pin === "false" ? false : true;
    } else {
      id = event.target.dataset.id;
      isPinnedOld = event.target.dataset.pin === "false" ? false : true;
    }

    try {
      const url = `${baseUrl}note/pin/${id}`;

      await axios.put(url, {
        isPinned: !isPinnedOld
      },{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      getNotes();

    } catch (error) {
      alert(error.response.data.message);
    }

  }

  const handleSearch = async () => {

    if(!inputValue){
      alert("Enter value to search");
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}note/find?term=${inputValue}`, 
        { withCredentials: true, header: { "Content-Type": "application/json" }});
  
      setAllNotes(response.data.response);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <>
      <Header inputValue={ inputValue } setInputValue={ setInputValue } handleSearch={ handleSearch } />

      <main className={ allNotes.length > 0 ? "grid grid-cols-3 px-12 pt-12 gap-6 bg-gradient-to-r pb-12 from-slate-900 to-slate-700 min-h-[85vh]" : "flex justify-center items-center w-full min-h-[85vh] bg-gradient-to-r from-slate-900 to-slate-700" }>
        {
          allNotes.length > 0 ?
          allNotes.map(note => (
            <NoteCard
              key={ note._id }
              id={ note._id }
              title={ note.title }
              content={ note.content }
              date={ moment(note.createdAt).format("Do MMM YYYY") }
              isPinned={ note.isPinned }
              tags={ note.tags }
              handleEdit={ handleNoteEdit }
              handleDelete={ handleNoteDelete }
              handlePinNote={ handlePinNote }
            />
          )) : <UserMessage message={ isLoggedIn ? "Start creating your first note! Click the 'Add' button to write down your thoughts, ideas, and reminders. Let's get started!" : "Log in to start creating your notes!" } img={ isLoggedIn ? addNoteImg : addUser } />
        }
        { isLoggedIn ? <span className="fixed bottom-8 right-20 h-16 w-16 flex justify-center items-center">
          <span ref={span} className="animate-ping absolute inline-flex rounded-full opacity-75 h-full w-full transition-all ease-in-out duration-300 cursor-pointer"></span>
          <MdAdd
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setModalIsOpen({
              isOpen: true,
              type: "Add",
              data: null
            })}
            className="text-white z-10 bg-sky-500 rounded-full w-16 h-16 p-4 cursor-pointer hover:rotate-180 transition-all"
          />

        </span> : null }
      </main>

      <Modal
        isOpen={modalIsOpen.isOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)"
          }
        }}
        className="w-[45%] outline-none fixed bottom-2/4 right-2/4 translate-x-1/2 translate-y-1/2"
      >
        <NoteModal type={modalIsOpen.type} handleClose={handleClose} noteDocument={modalIsOpen.data} />
      </Modal>

    </>
  )
}

export default Home