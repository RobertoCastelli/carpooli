// --- CONTEXT
import { ContextProvider } from "./context";
// --- ROUTER
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// --- COMPONENTS
import { Title } from "./components/Title";
import { ElencoAuto } from "./components/ElencoAuto";
import { Autisti } from "./components/Autisti";
import { CarpoolForm } from "./components/CarpoolForm";
import { Footer } from "./components/Footer";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Title />
        <Routes>
          <Route exact path="/" element={<ElencoAuto />} />
          <Route path="/autisti" element={<Autisti />} />
          <Route path="/carpoolform" element={<CarpoolForm />} />
        </Routes>
        <Footer />
      </Router>
    </ContextProvider>
  );
}

export default App;
