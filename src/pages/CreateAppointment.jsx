import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../api/appointments";
import { getUsers } from "../api/users";

export default function CreateAppointment() {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [users, setUsers] = useState([]);
  const [invitees, setInvitees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  const toggleInvite = (id) => {
    setInvitees((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  console.log({ title, start, end, invitees });

  async function handleCreate() {
    try {
      await createAppointment({
        title,
        start,
        end,
        invitees,
      });

      navigate("/appointments");
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Appointment</h1>

      <input
        type="text"
        className="w-full border p-2 rounded mb-3"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="text-sm text-gray-600">Start</label>
      <input
        type="datetime-local"
        className="w-full border p-2 rounded mb-3"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <label className="text-sm text-gray-600">End</label>
      <input
        type="datetime-local"
        className="w-full border p-2 rounded mb-4"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />

      <h2 className="text-lg font-medium mb-2">Invite People</h2>

      <div className="border rounded p-3 mb-4 max-h-48 overflow-y-auto bg-white">
        {users.map((u) => (
          <label key={u.id} className="flex items-center space-x-2 py-1">
            <input
              type="checkbox"
              checked={invitees.includes(u.id)}
              onChange={() => toggleInvite(u.id)}
            />
            <span>{u.name}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleCreate}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
