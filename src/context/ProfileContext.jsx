import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {
    const res = await API.get("/profile");
    setProfile(res.data);
  };

  const updateProfile = async (data) => {
    const res = await API.post("/profile", data);
    setProfile(res.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{ profile, updateProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () =>
  useContext(ProfileContext);
