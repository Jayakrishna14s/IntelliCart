import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Index } from "./pages/index/Index";
import { Error } from "./pages/error/Error";
import { Login } from "./pages/login/Login";
import {HomeGuard} from "./pages/home/HomeGuard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomeGuard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
