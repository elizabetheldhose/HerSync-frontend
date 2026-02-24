import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const HealthContext = createContext();

export function HealthProvider({ children }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await API.get("/health");
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveEntry = async (data) => {
    await API.post("/health", data);
    fetchEntries();
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <HealthContext.Provider
      value={{
        entries,
        loading,
        saveEntry,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  return useContext(HealthContext);
}
