// --- REACT
import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";

export const Riepologo = () => {
  const { riepilogo } = useContext(MyContext);

  return (
    <div>
      <ul>
        {riepilogo.map((record) => (
          <li key={record.id}>
            <div>{record.autista}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
