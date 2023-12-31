import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";
import toast, { Toaster } from 'react-hot-toast';

function User() {
  if (localStorage.getItem("user") !== null) {
    if (JSON.parse(localStorage.getItem("user")).username === undefined && JSON.parse(localStorage.getItem("user")).password === undefined) {
      window.location.href = "/login";
    }
  }
  const [data, setData] = useState({});
  const [notes, setNotes] = useState([]);
  const [noteShow, setNoteShow] = useState(false);
  const [noteBody, setNoteBody] = useState("");
  const [noteId, setNoteId] = useState(null);
  const getUserData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}login`,
        {
          username: JSON.parse(localStorage.getItem("user")).username,
          password: JSON.parse(localStorage.getItem("user")).password,
        }
      );

      if (response.status === 200) {
        setData(response.data.account);
        setNotes(response.data.account.notes);
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const showNote = (i) => {
    setNoteBody(notes[i].body);
    setNoteShow(true);
    setNoteId(i);
  };

  const saveNote = async (note, i) => {
    notes[i].body = note;
    setNoteShow(false);
    setNoteId(null);
    axios
      .put(`${process.env.REACT_APP_API_URL}note/${data._id}`, { notes })
      .then((response) => {
        toast.success("note is saved successfully");
      })
      .catch((error) => {
        toast.error("note is not saved!");
      });
  };

  const deleteNote = async (i) => {
    notes.splice(i, 1);
    setNoteShow(false);
    setNoteId(null);
    axios
      .put(`${process.env.REACT_APP_API_URL}note/${data._id}`, { notes })
      .then((response) => {
        getUserData();
        toast.success("note is deleted successfully");
      })
      .catch((error) => {
        toast.error("note is not deleted!");
      });
  };

  const closeNote = () => {
    setNoteShow(false);
    setNoteId(null);
  };

  const addnewNote = () => {
    let notesNb = notes.length;
    const newNote = prompt("Title of new note:", `Note${++notesNb}`);
    if (newNote != null) {
      if (newNote.length > 0) {
        axios
          .put(`${process.env.REACT_APP_API_URL}note/${data._id}`, {
            notes: [...notes, { title: newNote, body: "" }],
          })
          .then((response) => {
            getUserData();
            toast.success("new note is created successfully");
          })
          .catch((error) => {
            toast.error("new note is not created!");
          });
      }
    }
  };

  const copyNote = () => {
    try {
      const input = document.createElement("input");
      input.setAttribute("value", noteBody);
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      toast.success('Content copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy: ', err);
    }
  };

  const deleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account ?")) {
      axios
      .delete(`${process.env.REACT_APP_API_URL}delete/${data._id}`)
      .then((response) => {
        toast.success("your account has been deleted");
        localStorage.clear();
        window.location.href = "/login";
      })
      .catch((error) => {
        toast.error("your account has not been deleted!");
      });
    }
  }

  const logoutAccount = () => {
    localStorage.clear()
    window.location.href = "/login";
  }
  return (
    <>
      {!!data._id ? (
        <div className="">
          <Toaster position="top-right"/>
          <header>
            <h1 className=" text-center p-3 font-semibold text-2xl">NOTE</h1>
            <h2 className="container m-auto py-3 px-2 font-semibold">
              <button className="border-2 border-black p-2 m-3 rounded-lg transition-all hover:bg-red-600 hover:text-white" onClick={deleteAccount}>Delete Account: {data.username}</button>
              <button className="border-2 border-black p-2 mx-3 rounded-lg transition-all hover:bg-gray-600 hover:text-white" onClick={logoutAccount}>Logout</button>
            </h2>
          </header>
          <div className="notes container w-[90%] md:w-auto m-auto p-2 border-2 border-black rounded-md h-[70vh]">
            {notes.map((note, i) => (
              <button
                key={i}
                onClick={() => showNote(i)}
                className="p-2 border-2 border-black rounded-md font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {note.title}
              </button>
            ))}
            <button
              className="p-2 border-2 border-black rounded-md font-semibold bg-black text-white text-ellipsis whitespace-nowrap"
              onClick={addnewNote}
            >
              ADD NEW NOTE
            </button>
          </div>
          {noteShow && (
            <div className="fixed w-screen h-screen grid place-items-center bg-black bg-opacity-30 left-0 top-0">
              <div className="absolute top-11 right-16">
                <button
                  className="mx-2 p-2 bg-green-600 text-white rounded-md border-2 border-black"
                  onClick={copyNote}
                >
                  copy
                </button>
                <button
                  className="mx-2 p-2 bg-red-600 text-white rounded-md border-2 border-black"
                  onClick={() => deleteNote(noteId)}
                >
                  delete
                </button>
                <button
                  className="mx-2 p-2 bg-blue-600 text-white rounded-md border-2 border-black"
                  onClick={(e) => saveNote(noteBody, noteId)}
                >
                  save
                </button>
                <button
                  className="mx-2 p-2 bg-zinc-600 text-white rounded-md border-2 border-black"
                  onClick={closeNote}
                >
                  close
                </button>
              </div>
              <textarea
                className="bg-white container w-[90%] h-[70%] p-2 rounded-lg border-2 border-black resize-none outline-none"
                placeholder="Write your note ..."
                defaultValue={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
              ></textarea>
            </div>
          )}
        </div>
      ) : (
        <h1 className=" h-screen grid place-items-center font-semibold text-black text-4xl">
          loading..
        </h1>
      )}
    </>
  );
}

export default User;
