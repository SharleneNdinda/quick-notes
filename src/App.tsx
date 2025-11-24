import { useEffect, useState } from "react";
import "./App.css";

type Note = {
  id: number;
  text: string;
};

function App() {
  const [text, setText] = useState<string>("");
  const [notes, setNote] = useState<Note[]>([]);
  // load notes from storage

  // save notes to chrome extension
  useEffect(() => {
    chrome.storage.sync.set({ notes });
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;
    const newNote: Note = { id: Date.now(), text: text.trim() };
    setNote([newNote, ...notes]);
    setText("");
  };
  const deleteNote = (id: number) => {
    setNote(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="w-90 p-4 bg-orange-200 rounded-lg shadow-md font-sans ">
      <h2 className="text-xl font-bold mb-2 text-gray-800"> Quick Notes</h2>

      <div className="flex gap-2 mb-2">
        <input
          className="flex-b border border-gray-600 rounded px-2 py-1 focus:outline-none focus:right-2 focus:ring-blue-400"
          type="text"
          placeholder="Type a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-lime-950 text-white px-3 py-1 rounded hover:bg-blue-50 hover:text-lime-950"
          onClick={addNote}
        >
          Add
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {notes.length === 0 && (
          <p className="text-lime-950 text-sm font-bold">
            no new notes yet 😄{" "}
          </p>
        )}
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex justify-between items-center mb-2 p-2 bg-white rounded shadow-sm"
          >
            <span className="break-words">{note.text}</span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
