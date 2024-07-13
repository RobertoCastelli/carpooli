// --- REACT
import React, { useState, useEffect } from "react";
// --- FIREBASE
import { db } from "./FirebaseConfig";
import { getDocs, collection } from "firebase/firestore";
// --- CONTEXT
export const MyContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [auto, setAuto] = useState([]);

  useEffect(() => {
    const fetchAuto = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Auto"));
        let autoArray = [];
        querySnapshot.forEach((doc) => {
          autoArray.push({ id: doc.id, ...doc.data() });
        });
        setAuto(autoArray);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchAuto();
  }, []);

  return <MyContext.Provider value={{ auto }}>{children}</MyContext.Provider>;
};
