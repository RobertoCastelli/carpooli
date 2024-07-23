import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./utils/AppContext";
import SelectDriver from "./components/SelectDriver";
import SelectCar from "./components/SelectCar";
import RegisterDeparture from "./components/RegisterDeparture";
import CheckOut from "./components/CheckOut";

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SelectDriver />} />
        <Route path="/select-car" element={<SelectCar />} />
        <Route path="/register-departure" element={<RegisterDeparture />} />
        <Route path="/check-out" element={<CheckOut />} />
      </Routes>
    </Router>
  );
}

// Wrappa l'applicazione con il Provider per fornire il contesto
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
