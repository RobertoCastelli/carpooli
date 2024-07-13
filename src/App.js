// --- CONTEXT
import { ContextProvider } from "./context";
// --- ROUTER
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// --- COMPONENTS
import { Title } from "./components/Title";
import { ElencoAuto } from "./components/ElencoAuto";
import { Autisti } from "./components/Autisti";
import { FormPartenza } from "./components/FormPartenza";
import { FormRitorno } from "./components/FormRitorno";
import { Riepilogo } from "./components/Riepilogo";
import { Footer } from "./components/Footer";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Title />
        <Routes>
          <Route exact path="/" element={<ElencoAuto />} />
          <Route path="/autisti" element={<Autisti />} />
          <Route path="/partenza" element={<FormPartenza />} />
          <Route path="/ritorno" element={<FormRitorno />} />
          <Route path="/riepilogo" element={<Riepilogo />} />
        </Routes>
        <Footer />
      </Router>
    </ContextProvider>
  );
}

export default App;
