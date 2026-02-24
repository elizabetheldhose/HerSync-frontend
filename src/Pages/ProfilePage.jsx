import { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import API from "../services/api";
export default function ProfilePage() {
  const { profile, updateProfile } = useProfile();

  const [formData, setFormData] = useState(profile);
  const [preview, setPreview] = useState(profile?.avatar);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleImage = async (e) => {
  const file = e.target.files[0];

  const formData = new FormData();
  formData.append("avatar", file);

  const res = await API.post(
    "/profile/upload-avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  setPreview(res.data.avatar);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
    alert("Profile Updated!");
  };

  useEffect(() => {
    setFormData(profile);
    setPreview(profile.avatar);
  }, [profile]);

  return (
    <div className="p-8 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          My Profile
        </h1>
        <p className="text-gray-500">
          Manage your personal & health preferences
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >

        {/* LEFT SIDE */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center space-y-4">

          <img
            src={
              preview ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            className="w-28 h-28 rounded-full object-cover border"
          />

          <input
            type="file"
            onChange={handleImage}
            className="text-sm"
          />

          <p className="text-gray-400 text-xs">
            Upload your profile photo
          </p>

        </div>

        {/* PERSONAL DETAILS */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">

          <h3 className="text-lg font-semibold text-slate-700">
            Personal Details
          </h3>

          <input
            name="name"
            placeholder="Name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={formData.height || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

        </div>

        {/* HEALTH SETTINGS */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">

          <h3 className="text-lg font-semibold text-slate-700">
            Cycle Preferences
          </h3>

          <input
            type="number"
            name="cycleLength"
            placeholder="Cycle Length"
            value={formData.cycleLength || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <input
            type="number"
            name="periodLength"
            placeholder="Period Length"
            value={formData.periodLength || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />

          <button className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-2 rounded-lg mt-4">
            Save Profile
          </button>

        </div>

      </form>
    </div>
  );
}
