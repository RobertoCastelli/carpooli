// --- CONTEXT
import { ContextProvider } from "./context";
// --- ROUTER
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// --- COMPONENTS
import { Title } from "./components/Title";
import { ElencoAutisti } from "./components/ElencoAutisti";
import { ElencoAuto } from "./components/ElencoAuto";
import { FormPartenza } from "./components/FormPartenza";
import { FormRitorno } from "./components/FormRitorno";
import { Manutenzione } from "./components/Manutenzione";
import { Riepilogo } from "./components/Riepilogo";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Router>
      <ContextProvider>
        <div className="container">
          <div className="content">
            <Title />
            <Routes>
              <Route exact path="/" element={<ElencoAutisti />} />
              <Route path="/auto" element={<ElencoAuto />} />
              <Route path="/partenza" element={<FormPartenza />} />
              <Route path="/ritorno" element={<FormRitorno />} />
              <Route path="/manutenzione" element={<Manutenzione />} />
              <Route path="/riepilogo" element={<Riepilogo />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ContextProvider>
    </Router>
  );
}

export default App;
