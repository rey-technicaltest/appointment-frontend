import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../api/users";

const timezones = Intl.supportedValuesOf("timeZone"); // built-in list

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    preferred_timezone: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSave() {
    try {
      await updateProfile({
        name: profile.name,
        preferred_timezone: profile.preferred_timezone,
      });

      alert("Profile updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>

      <label className="block mb-1 text-sm">Name</label>
      <input
        type="text"
        name="name"
        className="w-full border p-2 rounded mb-3"
        value={profile.name}
        onChange={handleChange}
      />

      <label className="block mb-1 text-sm">Timezone</label>
      <select
        name="preferred_timezone"
        className="w-full border p-2 rounded mb-4"
        value={profile.preferred_timezone}
        onChange={handleChange}
      >
        <option value="">Select timezone</option>
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
