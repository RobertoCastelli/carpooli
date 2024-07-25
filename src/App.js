import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./utils/AppContext";

import Title from "./components/Title";
import Footer from "./components/Footer";

import SelectDriver from "./pages/SelectDriver";
import SelectCar from "./pages/SelectCar";
import RegisterDeparture from "./pages/RegisterDeparture";
import CheckOut from "./pages/CheckOut";

function AppContent() {
  return (
    <div className="container">
      <div className="content">
        <Title />
        <Routes>
          <Route exact path="/" element={<SelectDriver />} />
          <Route path="/select-car" element={<SelectCar />} />
          <Route path="/register-departure" element={<RegisterDeparture />} />
          <Route path="/check-out" element={<CheckOut />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

// Wrappa l'applicazione con il Provider per fornire il contesto
function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}

export default App;
