import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { acceptAppointment, getAppointments } from "../api/appointments";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  console.log(userId);

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load appointments");
    }
  }

  async function handleAccept(appointmentId, status) {
    try {
      await acceptAppointment(appointmentId, { status });

      if (status === "accepted") alert("You have accepted the appointment!");
      else alert("You have rejected the appointment!");

      loadAppointments();
    } catch (err) {
      console.error(err);
      alert("Unable to update invitation status");
    }
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>

        <div className="flex gap-3">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() => navigate("/profile")}
          >
            Edit Profile
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => navigate("/create")}
          >
            + Create
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {appointments.map((a) => {
          const me = a.participants.find((p) => p.user_id === userId);

          return (
            <div
              key={a.id}
              className="bg-white p-4 rounded shadow border border-gray-200"
            >
              <h2 className="text-xl font-semibold">{a.title}</h2>

              <p className="text-gray-500 text-sm mt-1">
                {a.start_local} → {a.end_local}
              </p>

              <p className="mt-2 font-medium">Participants:</p>
              <ul className="ml-6 list-disc text-sm">
                {a.participants.map((p) => (
                  <li key={p.id}>
                    {p.user.name} —{" "}
                    <span
                      className={
                        p.status === "accepted"
                          ? "text-green-600"
                          : p.status === "declined"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }
                    >
                      {p.status}
                    </span>
                  </li>
                ))}
              </ul>

              {me?.status === "pending" && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleAccept(a.id, "accepted")}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleAccept(a.id, "declined")}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
