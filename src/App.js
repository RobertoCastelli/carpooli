import { ContextProvider } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Title } from "./components/Title";
import { ElencoAuto } from "./components/ElencoAuto";
import { Autisti } from "./components/Autisti";
import { Footer } from "./components/Footer";
import { CarpoolForm } from "./components/CarpoolForm";

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
