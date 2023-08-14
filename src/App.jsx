import { DashBoard, LogIn, Signup } from "./componants/utils";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (<div className="background">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/Dash-board" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
