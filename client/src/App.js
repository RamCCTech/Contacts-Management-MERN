import "./App.css";
import Navbar from "./components/layout/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddContact from "./pages/AddContact";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Auth type="signin" />} />
        <Route path="/signup" element={<Auth type="signup" />} />
        <Route
          path="/forgotpassword"
          element={<Auth type="forgotpassword" />}
        />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/update-contact/:id" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
